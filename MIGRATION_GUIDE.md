# 📦 Migration Guide - HTML to Docusaurus

## ✅ What Has Been Completed

### 1. **Docusaurus Setup** - DONE ✓
- Full installation in `./docusaurus-site/`
- 10 custom React components created
- Complete documentation written
- AI prompt templates ready

### 2. **First Lecture Migrated** - DONE ✓
- **Lecture 06: Doubly Linked Lists** successfully converted
- Location: `docusaurus-site/docs/06-doubly-linked-lists/lecture.md`
- All HTML content transformed to use new components
- InfoBoxes, WarningBoxes, Grids, Code blocks all working

## 🎯 Your Lectures to Migrate

You have **10 lectures** total:

1. ✅ **Migrated**: Lecture 06 - Doubly Linked Lists
2. ⏳ **Remaining**: 9 lectures

### Lecture List:

```
1. Concepts of Complexity, Big-O Notation, Testing...
2. Compiler Optimizations, Locality, Containers...
3. Introduction to Linear Data Structures: Arrays...
4. Dynamic Array
5. C++ Data Structures & Memory Management: Lists...
6. ✅ Doubly Linked Lists (DONE)
7. Design Pattern: Proxy and Data Structures Stack...
8. Stack and Queue Applications: Shunting Yard...
9. Binary Search Trees: Concepts...
10. Trees, Binary Trees, Binary Search Trees...
```

## 🚀 How to Migrate Remaining Lectures

### Option 1: Use AI (Recommended - FAST!)

For each lecture:

1. **Read the existing markdown** (each folder has `lecture.md` and `exc.md`)
2. **Copy the AI prompt** from `docusaurus-site/AI_PROMPT_TEMPLATES.md`
3. **Give AI the content** and ask it to convert to Docusaurus format
4. **Save** to `docusaurus-site/docs/[number]-[topic-name]/lecture.md`

**Example prompt:**

```
Convert this existing lecture content to Docusaurus format with components.

Use these imports:
- InfoBox, WarningBox, SuccessBox, WhyBox
- LearningObjectives
- CollapsibleSection
- ComparisonBox
- Grid, Card

Original content:
[paste lecture.md content here]

Convert it maintaining all information but using the new components.
```

### Option 2: Manual Migration

1. Create folder: `docusaurus-site/docs/[number]-[topic]/`
2. Create `lecture.md` with frontmatter and imports
3. Convert HTML/markdown to use components
4. Add code blocks, info boxes, etc.

### Option 3: Hybrid Approach (Best Balance)

1. Use AI to do the initial conversion
2. Review and adjust manually
3. Test in browser
4. Refine if needed

## 📝 Migration Template

For each lecture, create this structure:

```markdown
---
title: "[Lecture Title]"
sidebar_position: [number]
tags: [tag1, tag2, tag3]
---

import InfoBox from '@site/src/components/InfoBoxes/InfoBox';
import WarningBox from '@site/src/components/InfoBoxes/WarningBox';
import SuccessBox from '@site/src/components/InfoBoxes/SuccessBox';
import WhyBox from '@site/src/components/InfoBoxes/WhyBox';
import LearningObjectives from '@site/src/components/LearningObjectives';
import CollapsibleSection from '@site/src/components/CollapsibleSection';
import ComparisonBox from '@site/src/components/Comparison/ComparisonBox';
import Grid from '@site/src/components/Grid/Grid';
import Card from '@site/src/components/Grid/Card';

# [Lecture Title]

<LearningObjectives
  objectives={[
    "Objective 1",
    "Objective 2",
    "Objective 3"
  ]}
/>

[Rest of content with components...]
```

## 🔄 Quick Migration Workflow

### For Each Lecture:

```bash
# 1. Read existing content
cat "[Lecture Folder]/lecture.md"

# 2. Convert with AI or manually
# (Use AI prompt template)

# 3. Save to new location
# docusaurus-site/docs/[number]-[topic]/lecture.md

# 4. Same for exercises
# docusaurus-site/docs/[number]-[topic]/exercises.md

# 5. Test
cd docusaurus-site
npm start  # View at http://localhost:3000
```

## 📊 Progress Tracking

Create a checklist as you migrate:

### Lectures:
- [ ] 01 - Complexity & Big-O
- [ ] 02 - Compiler Optimizations
- [ ] 03 - Linear Data Structures
- [ ] 04 - Dynamic Array
- [ ] 05 - Memory Management
- [x] 06 - Doubly Linked Lists ✓
- [ ] 07 - Proxy Pattern & Stack/Queue
- [ ] 08 - Stack/Queue Applications
- [ ] 09 - Binary Search Trees
- [ ] 10 - Trees & Balanced Trees

### Exercises:
- [ ] 01 - Exercises
- [ ] 02 - Exercises
- [ ] 03 - Exercises
- [ ] 04 - Exercises
- [ ] 05 - Exercises
- [ ] 06 - Exercises
- [ ] 07 - Exercises
- [ ] 08 - Exercises
- [ ] 09 - Exercises
- [ ] 10 - Exercises

## 💡 Pro Tips

### 1. **Batch Process**
Migrate 2-3 lectures, test together, then continue

### 2. **Use AI Efficiently**
Process multiple lectures in one AI session with clear numbering

### 3. **Test Incrementally**
Start dev server and check each migrated lecture immediately

### 4. **Keep Original Files**
Don't delete old HTML until you're satisfied with migration

### 5. **Focus on Content**
Don't over-style - the components handle that automatically

## 🎨 Component Usage Guidelines

### When to use what:

| Component | Use For |
|-----------|---------|
| `<InfoBox>` | Definitions, key concepts, important info |
| `<WarningBox>` | Common mistakes, pitfalls, cautions |
| `<SuccessBox>` | Best practices, recommendations, tips |
| `<WhyBox>` | Motivation, real-world applications |
| `<CollapsibleSection>` | Hints, optional content, deep dives |
| `<ComparisonBox>` | Correct vs incorrect code examples |
| `<Grid>` + `<Card>` | Pros/cons, feature lists, comparisons |
| `<LearningObjectives>` | Start of every lecture (3-5 goals) |
| `<ExerciseCard>` | Individual practice problems |
| `<ProgressTracker>` | Top of exercise pages |

## 🚀 Next Steps

### Immediate (Now):

1. ✅ Review the migrated Doubly Linked Lists lecture
2. Test the dev server with a clean port
3. Decide on migration approach (AI/Manual/Hybrid)

### Short Term (This Week):

1. Migrate 2-3 more lectures
2. Migrate corresponding exercises
3. Test all migrated content
4. Adjust styling if needed

### Medium Term (Next Week):

1. Complete all 10 lecture migrations
2. Complete all 10 exercise migrations
3. Add any missing content
4. Final testing and refinement

### Long Term:

1. Deploy to GitHub Pages
2. Share with students
3. Gather feedback
4. Iterate and improve

## 📁 File Organization

Your new structure will be:

```
docusaurus-site/docs/
├── 01-complexity/
│   ├── lecture.md
│   └── exercises.md
├── 02-compiler-optimizations/
│   ├── lecture.md
│   └── exercises.md
...
├── 06-doubly-linked-lists/  ✅ DONE
│   ├── lecture.md
│   └── exercises.md
...
└── 10-trees/
    ├── lecture.md
    └── exercises.md
```

## 🎯 Success Criteria

You'll know migration is successful when:

- ✅ All 10 lectures are in `docs/` folder
- ✅ All exercises are migrated
- ✅ Dev server runs without errors
- ✅ All components render correctly
- ✅ Mobile view works well
- ✅ Dark mode works
- ✅ Progress tracking works for exercises
- ✅ Navigation is smooth
- ✅ Build succeeds (`npm run build`)

## 🆘 Troubleshooting

### Dev Server Won't Start
```bash
# Kill any running Node processes
pkill -f "node.*docusaurus"

# Try again
cd docusaurus-site
npm start
```

### Components Not Rendering
- Check import statements
- Verify component names match exactly
- Look for syntax errors in JSX

### Build Errors
```bash
npm run clear
npm run build
```

## 📞 Need Help?

1. Check [SETUP_GUIDE.md](docusaurus-site/SETUP_GUIDE.md)
2. See example in `docs/06-doubly-linked-lists/lecture.md`
3. Use AI with the prompt templates
4. Review Docusaurus docs: https://docusaurus.io/

---

## 🎓 Summary

**You have:**
- ✅ Complete Docusaurus setup
- ✅ 10 pre-built components
- ✅ 1 lecture fully migrated as example
- ✅ Comprehensive documentation
- ✅ AI prompts ready to use

**You need to:**
- 🔄 Migrate 9 more lectures
- 🔄 Migrate 10 exercise sets
- 🔄 Test everything
- 🚀 Deploy when ready

**Estimated time with AI:**
- Per lecture: 10-15 minutes
- Per exercise set: 10-15 minutes
- Total: **3-4 hours** for all content

**Without AI (manual):**
- Per lecture: 30-45 minutes
- Per exercise set: 30-45 minutes
- Total: **10-15 hours** for all content

**Recommendation:** Use AI with the provided templates for 3-4x speed improvement!

---

**Ready to continue? Start with Lecture 1 or 7 next! 🚀**
