import { FileText, Code, Clipboard } from "lucide-react";  // Add relevant icons

const SkillDevelopment = () => {
  return (
    <div className="tabs-scroll w-full p-6 overflow-y-auto h-[calc(100vh-64px)]">
      <h1 className="text-3xl font-semibold">Skill Development</h1>

      <section className="skill-categories">
        <h2 className="text-xl font-medium">Skill Categories</h2>
        <div className="categories-list">
          <div className="category-card">
            <Code size={24} />
            <h3>Technical Skills</h3>
            <p>Learn coding, software development, and IT-related skills</p>
          </div>
          <div className="category-card">
            <Clipboard size={24} />
            <h3>Management Skills</h3>
            <p>Improve your leadership and organizational skills</p>
          </div>
          <div className="category-card">
            <FileText size={24} />
            <h3>Creative Skills</h3>
            <p>Explore graphic design, photography, and other creative areas</p>
          </div>
          {/* Add more categories as needed */}
        </div>
      </section>

      <section className="learning-resources">
        <h2 className="text-xl font-medium">Learning Resources</h2>
        <ul>
          <li><a href="https://www.example.com">Course 1 - Learn Python</a></li>
          <li><a href="https://www.example.com">Book - JavaScript Mastery</a></li>
          {/* More resources */}
        </ul>
      </section>

      <section className="skill-quiz">
        <h2 className="text-xl font-medium">Skill Challenges</h2>
        <button className="start-quiz-btn">Start Quiz</button>
      </section>

      <section className="goal-setting">
        <h2 className="text-xl font-medium">Set Your Learning Goals</h2>
        <form>
          <label>Goal</label>
          <input type="text" placeholder="e.g., Complete HTML in 30 days" />
          <button type="submit">Set Goal</button>
        </form>
      </section>

      <section className="badges">
        <h2 className="text-xl font-medium">Your Badges</h2>
        <div className="badge-list">
          <div className="badge-card">Completed Python Course</div>
          {/* More badges */}
        </div>
      </section>
    </div>
  );
};

export default SkillDevelopment;
