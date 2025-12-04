const fs = require('fs');
const path = require('path');

/**
 * Docusaurus Plugin to automatically load lecture metadata
 * This runs at build time and makes lecture data available globally
 */
module.exports = function lecturesPlugin(context, options) {
  return {
    name: 'lectures-plugin',

    async loadContent() {
      const docsDir = path.join(context.siteDir, 'docs');
      const lectures = [];

      // Read all directories in docs/
      const entries = fs.readdirSync(docsDir, { withFileTypes: true });

      for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        // Check if directory name starts with number (e.g., 01-complexity)
        const match = entry.name.match(/^(\d+)-(.+)$/);
        if (!match) continue;

        const number = parseInt(match[1], 10);
        const slug = match[2];

        // Read _category_.json
        const categoryPath = path.join(docsDir, entry.name, '_category_.json');
        if (!fs.existsSync(categoryPath)) {
          console.warn(`Warning: No _category_.json found for ${entry.name}`);
          continue;
        }

        const categoryData = JSON.parse(fs.readFileSync(categoryPath, 'utf8'));

        // Extract title from label (remove number prefix like "01. ")
        const title = categoryData.label.replace(/^\d+\.\s*/, '');
        const description = categoryData.link?.description || '';

        // Check if lecture.md exists (indicates lecture is ready)
        const lecturePath = path.join(docsDir, entry.name, 'lecture.md');
        const status = fs.existsSync(lecturePath) ? 'ready' : 'pending';

        // Extract topics based on title
        const topics = extractTopics(title);

        lectures.push({
          number,
          title,
          slug,
          status,
          topics,
          description
        });
      }

      // Sort by lecture number
      lectures.sort((a, b) => a.number - b.number);

      return { lectures };
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      // Make lectures data available globally to all pages
      setGlobalData(content);
    },
  };
};

/**
 * Extract topics from lecture title
 */
function extractTopics(title) {
  if (title.includes('Hash') || title.includes('Хеш')) {
    return ['Hash Tables', 'Hash Functions', 'Криптография', 'Колизии'];
  }
  if (title.includes('Графи')) {
    return ['Графи', 'BFS', 'DFS', 'Алгоритми'];
  }
  if (title.includes('Дървета')) {
    return ['Дървета', 'BST', 'Обхождане', 'Баланс'];
  }
  if (title.includes('Heap')) {
    return ['Heap', 'Priority Queue', 'Heapify', 'Heap Sort'];
  }
  if (title.includes('Сортиране')) {
    return ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Complexity'];
  }
  if (title.includes('Стек') || title.includes('Опашка')) {
    return ['Stack', 'Queue', 'LIFO', 'FIFO'];
  }
  if (title.includes('Списъци')) {
    return ['Linked Lists', 'Итератори', 'Памет', 'Навигация'];
  }
  if (title.includes('Масиви')) {
    return ['Arrays', 'Търсене', 'Достъп', 'Памет'];
  }
  if (title.includes('Сложност') || title.includes('Big-O')) {
    return ['Сложност', 'Big-O', 'Тестване', 'Анализ'];
  }
  if (title.includes('Компилатор') || title.includes('Оптимизаци')) {
    return ['Компилатор', 'Оптимизация', 'Кеш', 'Производителност'];
  }

  // Default topics
  return ['Data Structures', 'Algorithms', 'C++', 'Practice'];
}
