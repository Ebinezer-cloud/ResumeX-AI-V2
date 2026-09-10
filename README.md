# 🚀 ResumeX AI V2

## AI-Powered Resume Analyzer & Job Matching Platform

ResumeX AI V2 is a professional resume intelligence platform that analyzes resumes, generates an ATS-style score, detects technical skills, identifies important resume sections, provides improvement suggestions, and matches resumes with job descriptions.

It is designed with a modern professional dashboard and can run locally without requiring a paid AI API.

---

## ✨ Features

### 📄 Resume Analyzer

ResumeX AI supports:

- PDF resumes
- DOCX resumes
- TXT resumes
- ATS-style scoring
- Resume word count
- Technical skill detection
- Resume section detection
- Resume strengths
- Improvement suggestions
- Resume quality insights

### 🎯 Job Description Matcher

Compare a resume against a specific job description.

The Job Match feature provides:

- Resume-to-job match percentage
- Matched technical skills
- Missing technical skills
- Relevant job keywords
- Job alignment suggestions

### 🎨 Professional UI

ResumeX AI V2 includes:

- Modern dark dashboard
- Professional interface
- Clean navigation
- Responsive design
- Minimal unnecessary controls
- Resume upload interface
- ATS score visualization
- Skill chips
- Analysis result cards
- Job matching dashboard
- Mobile-friendly layout

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Python
- Flask
- Flask-CORS

## Document Processing

- PyPDF
- python-docx

## Analysis

- Python text processing
- Keyword extraction
- Skill detection
- Section detection
- ATS-style scoring
- Job-description matching

---

# 📁 Project Structure

```text
ResumeX-AI-V2/
│
├── backend/
│   ├── app.py
│   ├── analyzer.py
│   └── requirements.txt
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── uploads/
│   └── .gitkeep

----
💻 Requirements

.Before running ResumeX AI V2, install:

.Windows 10 or Windows 11
.Python 3.10 or newer

.No Node.js is required.

.No database is required.

.No API key is required.
│
├── reports/
│   └── .gitkeep
│
├── run.bat
├── README.md
└── .gitignore

-----

⚡ Installation
1. Clone the Repository
git clone https://github.com/your-username/ResumeX-AI-V2.git

2. Open the Project
cd ResumeX-AI-V2

3. Run the Application

On Windows, simply double-click:

run.bat
The run.bat file automatically:

1.Checks whether Python is installed
2.Creates a Python virtual environment
3.Installs required dependencies
4.Starts the Flask backend
5.Checks the backend status
6.Opens the application in the browser

-------

🌐 Application URL

After starting the application:

http://127.0.0.1:5000

You can also open:

http://localhost:5000

------

📄 Resume Analyzer Workflow
Upload Resume
      │
      ▼
File Validation
      │
      ▼
Text Extraction
      │
      ▼
Resume Analysis
      │
 ┌────┼─────┐
 ▼    ▼     ▼
Skills Sections Score
 │    │     │
 └────┼─────┘
      ▼
Resume Insights
      │
 ┌────┴─────┐
 ▼          ▼
Strengths  Suggestions

------

🎯 Job Matching Workflow
Upload Resume
      │
      ▼
Extract Resume Text
      │
      ▼
Paste Job Description
      │
      ▼
Keyword Analysis
      │
      ▼
Skill Comparison
      │
 ┌────┴────────┐
 ▼             ▼
Matched       Missing
Skills        Skills
 │             │
 └──────┬──────┘
        ▼
Match Percentage
        │
        ▼
Improvement Advice

-------

📊 ATS-Style Analysis

ResumeX AI generates an ATS-style score based on resume content signals.

The analysis considers:

Resume content volume
Technical skills
Resume sections
Action-oriented language
Relevant keywords

Example:

ATS-STYLE SCORE

        86
       /100

Skills Detected: 15
Word Count: 520
Sections Detected: 6

Note: ResumeX AI's score is a heuristic ATS-style score for guidance and learning. It is not an official score from any recruiting platform and does not guarantee interview selection.

-------

🧠 Skill Detection

ResumeX AI can detect commonly used software engineering and technology skills.

Examples:

Python
Java
JavaScript
TypeScript
C++
SQL
HTML
CSS
React
Next.js
Node.js
Express
Flask
Django
Spring Boot
MySQL
PostgreSQL
MongoDB
Redis
Git
GitHub
Docker
AWS
Azure
TensorFlow
PyTorch
OpenCV
Machine Learning
Deep Learning
Artificial Intelligence
NLP
Computer Vision

The skill list can be expanded in:

backend/analyzer.py

-------

📋 Resume Sections

ResumeX AI detects common resume sections such as:

✓ Summary
✓ Education
✓ Experience
✓ Projects
✓ Skills
✓ Contact

This helps identify whether important resume sections are present.

-------

💡 Improvement Suggestions

ResumeX AI can provide suggestions such as:

Add a concise professional summary tailored to the target role.

Add relevant experience or internships with measurable outcomes.

Add 2–4 relevant projects and mention the technologies used.

Add relevant technical skills that match the jobs you are targeting.

Start bullet points with strong action verbs and focus on results.

------

# 🧪 Testing

ResumeX AI V2 can be tested using PDF, DOCX, and TXT resume files.

## Recommended Test Resume

Use a Software Engineer resume containing skills such as:

```text
Python
Java
JavaScript
TypeScript
HTML
CSS
React
Node.js
Express
Flask
Django
SQL
MySQL
PostgreSQL
MongoDB
Git
GitHub
Docker
AWS
TensorFlow
PyTorch
OpenCV
Machine Learning
Artificial Intelligence

------

🎯 Job Match Testing

To test the Job Match feature, upload a resume and paste the following sample job description:

Software Engineer

We are looking for a Software Engineer with experience in Python,
JavaScript, React, Node.js and SQL.

Requirements:

Python
JavaScript
TypeScript
React
Node.js
Express
REST API
SQL
PostgreSQL
MongoDB
Git
GitHub
Docker
AWS

Experience with Machine Learning, TensorFlow, PyTorch, OpenCV
or Artificial Intelligence is a plus.

The candidate should have strong problem-solving skills,
debugging experience and the ability to work collaboratively
in an Agile development environment.

ResumeX AI should compare the resume against the job description and display:

Match percentage
Matched skills
Missing skills
Relevant keywords
Improvement suggestions

-------

📊 Expected Analysis

A successful resume analysis should display information similar to:

ATS SCORE
86 / 100

RESUME DETAILS
Word Count: 500+
Skills Detected: 15+
Sections Detected: 6+

SECTIONS
✓ Summary
✓ Skills
✓ Experience
✓ Projects
✓ Education
✓ Contact

SKILLS
✓ Python
✓ Java
✓ JavaScript
✓ React
✓ Node.js
✓ SQL
✓ MongoDB
✓ Git
✓ Docker
✓ AWS

The exact score will depend on the uploaded resume.

--------

🔄 Application Workflow
             ResumeX AI V2
                   │
                   ▼
            Upload Resume
                   │
                   ▼
           Extract Resume Text
                   │
                   ▼
             Analyze Resume
                   │
          ┌────────┼────────┐
          ▼        ▼        ▼
        Skills  Sections   Score
          │        │        │
          └────────┼────────┘
                   ▼
             Resume Insights
                   │
          ┌────────┴────────┐
          ▼                 ▼
      Strengths        Suggestions

-------

🔐 Privacy

ResumeX AI V2 is designed for local usage.

The core application does not require a third-party AI API.

Uploaded resumes are processed by the local Flask application.

For production deployment, additional security features should be added, including:

Secure file validation
File size limits
Automatic uploaded-file cleanup
Authentication
Authorization
Rate limiting
HTTPS
Secure storage

