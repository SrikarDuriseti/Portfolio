import { ExperienceItem, ProjectItem, SkillCategory } from './types';

export const resumeData = {
  hero: {
    name: "Ratna Srikar Duriseti",
    title: "Data Enthusiast",
    image: "/Portfolio/profile.jpg",
  },
  about: {
    summary: "Data Enthusiast with 4+ years of experience across aerospace, analytics, and AI domains. Skilled in delivering business insights, building scalable data pipelines, and deploying AI-powered solutions with LLM integration and cloud technologies. Adept at transforming complex data into actionable intelligence and automation.",
    responsibilities: [
      "Leveraged aerospace domain understanding to interpret complex engineering and operational data for real-time analysis and process optimization.",
      "Conducted institutional research and academic performance analysis, enhancing data quality, reporting accuracy, and student retention outcomes.",
      "Designed and deployed end-to-end data pipelines and intelligent systems using cloud-native tools, APIs, and AI models.",
      "Built predictive analytics models and interactive BI dashboards to guide business decisions and academic strategy.",
      "Applied machine learning and LLMs to automate document processing, semantic search, and deduplication in grant management systems.",
      "Collaborated cross-functionally to align analytics strategy with institutional and client goals, using tools like Power BI, Azure, SQL, and Python."
    ]
  },
  skills: [
    { category: "AI & Machine Learning", skills: ["Azure OpenAI", "AI Search", "LangChain", "LangGraph", "n8n", "Model Evaluation & Tuning"] },
    { category: "Cloud Platforms", skills: ["Microsoft Azure (ADLS, Data Factory, Key Vault, AI Search, Azure OpenAI, AI Foundry)"] },
    { category: "Data Analytics & BI", skills: ["DAX", "Excel", "Microsoft Fabric", "Power BI", "Tableau", "Looker"] },
    { category: "Data Engineering & ETL", skills: ["Alteryx", "Apache Airflow", "Azure Data Factory", "Informatica", "PySpark", "UBIX AI"] },
    { category: "Programming & Tools", skills: ["Python", "SQL", "C", "SAS", "AutoCAD", "AbaqusCAE", "Fusion360"] },
    { category: "Workflow Automation & Low-code", skills: ["API Integration", "Azure Logic Apps", "Power Apps", "Power Automate"] }
  ] as SkillCategory[],
  education: [
    {
      university: "University of North Texas",
      degree: "Master of Science in Data Science",
      period: "Aug 2022 - May 2024",
      location: "Denton, USA"
    },
    {
      university: "Amrita University",
      degree: "Bachelor of Technology in Aerospace Engineering",
      period: "July 2016 - May 2020",
      location: "Coimbatore, India"
    }
  ],
  experience: [
    {
      role: "Data Analytics Engineer",
      company: "Quadrant Technologies LLC",
      period: "July 2024 - Present",
      location: "Seattle, USA",
      description: [
        "Led end-to-end development of an AI chatbot enabling natural language querying on structured job market data, reducing client data retrieval time by 60%.",
        "Implemented semantic indexing using Azure AI Search, improving query response accuracy by 30% and reducing average query latency from 8s to 3s.",
        "Developed automated visualization workflows with PandasAI, increasing report generation speed by 50% and enhancing data insight clarity for end users.",
        "Developed and deployed an AI-powered grant reviewer system using Streamlit (UI), Docker (containerization), and Git (version control).",
        "Engineered a deduplication agent using OpenAI's text-embedding model, semantic similarity scoring, and Azure AI Search to detect and eliminate duplicate grant applications.",
        "Implemented a custom similarity threshold to assign the top 3 reviewers per application based on content vector similarity and expertise."
      ]
    },
    {
      role: "Freelance AI Trainer",
      company: "Outlier AI",
      period: "July 2024 - Dec 2024",
      location: "Remote, USA",
      description: [
        "Improved AI model accuracy by 30% by developing high-quality training datasets using preprocessing, annotation techniques.",
        "Critiqued and optimized AI tasks and LLM responses, enabling generation of outputs that exceeded SOTA (State of the Art) benchmarks.",
        "Delivered targeted feedback on LLM outputs to enhance truthfulness, conciseness, and instruction adherence.",
        "Streamlined and automated data preparation and model evaluation pipelines, boosting workflow efficiency by 30%."
      ]
    },
    {
      role: "Institutional Research Analyst",
      company: "Varsity Education Management Pvt Ltd",
      period: "Dec 2019 - June 2022",
      location: "Hyderabad, India",
      description: [
        "Implemented a Faculty Timesheet Management System using SQL and Python, optimizing scheduling and reducing data retrieval time by 40%.",
        "Developed Tableau dashboards to monitor student performance and retention trends, increasing retention rates by 25% in underperforming departments.",
        "Automated ETL workflows with Alteryx, reducing manual processing by 50% and improving reporting accuracy.",
        "Conducted academic performance analyses, enabling data-driven faculty reallocations and improving teaching effectiveness across three campuses.",
        "Built Power BI dashboards using time series forecasting to project enrollment trends and guide institutional budgeting decisions."
      ]
    }
  ] as ExperienceItem[],
  projects: [
    {
      title: "Data Analysis Business 360 Project- PowerBI",
      period: "July 2024 - Sept 2024",
      description: [
        "Developed a comprehensive Power BI dashboard for AtliQ Hardware, enabling strategic insights across Sales, Finance, Marketing, and Supply Chain to drive global business growth.",
        "Implemented key performance metrics in the dashboard, including Net Sales, Gross Margin, and Profit & Loss statements, facilitating data-driven decision-making across departments.",
        "Optimized dashboard performance using DAX Studio, significantly enhancing rendering speed and efficiency for end-users."
      ]
    },
    {
      title: "Sales and Finance Data Analysis Project",
      period: "July 2024 - Aug 2024",
      description: [
        "Analyzed complex sales and financial data for AtliQ Hardwares using advanced Excel techniques (Power Pivot, Power Query, DAX Measures, Pivot Tables) to uncover insights, optimize performance, and drive decision-making.",
        "Conducted market performance analysis and risk assessment, identifying top and bottom product performers and evaluating sales by category for strategic insights.",
        "Analyzed P&L statements across regions, identifying seasonal sales trends and assessing profitability by fiscal year quarters, leading to improved product pricing strategies.",
        "Created actionable insights on market-region performance, improving marketing strategies and overall effectiveness through data-driven decision-making."
      ]
    },
    {
      title: "Speech Emotion Recognition Project",
      period: "Feb 2024 - May 2024",
      description: [
        "Developed and fine-tuned a 5-layer CNN model for Speech Emotion Recognition, achieving a testing accuracy of 92.9% on emotion classification using MFCC features extracted from audio signals.",
        "Pre-processed and merged multiple audio datasets (CREMA-D, RAVDESS, SAVEE, TESS) and applied SMOTE for balancing imbalanced classes, improving model performance.",
        "Conducted Exploratory Data Analysis (EDA) using waveform and spectrogram plots to analyze and visualize key features like pitch, intonation, and loudness across different emotions."
      ]
    },
    {
      title: "Employee Attrition Project",
      period: "Sept 2022 - Dec 2022",
      description: [
        "Performed data pre-processing on a dataset with 35 attributes and transformed categorical variables using Label Encoding to prepare data for machine learning models.",
        "Built and evaluated classification models using Logistic Regression, Decision Trees, and Random Forest algorithms to predict employee attrition, with Random Forest emerging as the best-performing model.",
        "Evaluated model performance using accuracy, precision, recall, and F1-score metrics to ensure reliability and effectiveness."
      ]
    }
  ] as ProjectItem[],
  publications: [
      {
          title: 'Duriseti, R. Srikar., et al. "Predictive Analytics - Delamination Propagation Study on Aircraft Composite Rib Subjected to Fatigue Loading, 2019-2020"',
          period: "",
          description: ["A computational fatigue study of the propagation of delamination in a composite wing rib was conducted taking into account the gust loads experienced by the aircraft wing section during the cruise phase of flight as the source of fatigue."]
      }
  ],
  contact: {
    phone: "940-843-3664",
    email: "srikar.duriseti@gmail.com",
    linkedin: "https://linkedin.com/in/srikar-duriseti/",
    github: "https://github.com/SrikarDuriseti"
  }
};