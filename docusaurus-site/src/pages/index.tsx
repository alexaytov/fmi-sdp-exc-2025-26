import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

// Lecture data - automatically loaded from docs/_category_.json files by lectures-plugin
// Data is loaded at build time by the Docusaurus plugin
function useLectures() {
  const { lectures } = usePluginData('lectures-plugin') as { lectures: any[] };
  return lectures;
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/complexity-big-o/lecture">
            Започнете да Учите 📚
          </Link>
        </div>
      </div>
    </header>
  );
}

interface Lecture {
  number: number;
  title: string;
  slug: string;
  status: string;
  topics: string[];
}

function LectureCard({lecture}: {lecture: Lecture}) {
  const isReady = lecture.status === 'ready';

  return (
    <div className={clsx(styles.lectureCard, !isReady && styles.lectureCardPending)}>
      <div className={styles.lectureCardHeader}>
        <span className={styles.lectureNumber}>Лекция {lecture.number}</span>
        {isReady && <span className={styles.statusBadge}>✓ Готова</span>}
        {!isReady && <span className={styles.statusBadgePending}>⏳ Скоро</span>}
      </div>
      <h3 className={styles.lectureTitle}>{lecture.title}</h3>
      <div className={styles.lectureTopics}>
        {lecture.topics.map((topic, idx) => (
          <span key={idx} className={styles.topicTag}>{topic}</span>
        ))}
      </div>
      <div className={styles.lectureLinks}>
        {isReady ? (
          <>
            <Link to={`/docs/${lecture.slug}/lecture`} className={styles.lectureLink}>
              📖 Лекция
            </Link>
            <Link to={`/docs/${lecture.slug}/exercises`} className={styles.exerciseLink}>
              ✏️ Упражнения
            </Link>
          </>
        ) : (
          <span className={styles.comingSoon}>Скоро</span>
        )}
      </div>
    </div>
  );
}

function LecturesSection() {
  const lectures = useLectures();

  return (
    <section className={styles.lecturesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          📚 Учебни Материали
        </Heading>
        <p className={styles.sectionSubtitle}>
          Курсът съдържа лекции, всяка с теория и практически упражнения
        </p>
        <div className={styles.lecturesGrid}>
          {lectures.map((lecture) => (
            <LectureCard key={lecture.number} lecture={lecture} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3>Интерактивно Обучение</h3>
            <p>Всяка лекция включва примери, обяснения и практически упражнения</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💻</div>
            <h3>C++ Примери</h3>
            <p>Реални примери с код, който можете да изпълните и тествате</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📊</div>
            <h3>Проследяване на Прогрес</h3>
            <p>Следете своя напредък с автоматично проследяване на завършените упражнения</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🌙</div>
            <h3>Тъмен Режим</h3>
            <p>Удобно за четене през деня и през нощта</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Начало"
      description="Курс по Структури от Данни и Алгоритми в C++">
      <HomepageHeader />
      <main>
        <LecturesSection />
        <FeaturesSection />
      </main>
    </Layout>
  );
}
