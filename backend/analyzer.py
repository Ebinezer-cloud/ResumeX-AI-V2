import re

SKILLS = [
    "python","java","javascript","typescript","c","c++","c#","html","css",
    "react","angular","vue","node.js","express","flask","django","fastapi",
    "sql","mysql","postgresql","mongodb","git","github","docker","aws","azure",
    "machine learning","deep learning","artificial intelligence","ai",
    "data science","tensorflow","pytorch","opencv","nlp","computer vision",
    "rest api","linux","power bi","tableau","excel","figma","firebase",
    "supabase","kubernetes","spring boot","next.js","tailwind","redis"
]

ACTION_WORDS = [
    "developed","created","designed","implemented","built","deployed","managed",
    "improved","automated","analyzed","led","optimized","engineered","delivered"
]

def count_words(text):
    return len(re.findall(r"\b[\w+#.-]+\b", text))

def extract_skills(text):
    low = text.lower()
    return sorted({s for s in SKILLS if s in low})

def sections(text):
    low = text.lower()
    aliases = {
        "Summary":["summary","profile","objective","about me"],
        "Education":["education","academic","qualification","degree","university","college"],
        "Experience":["experience","employment","work history","internship"],
        "Projects":["projects","project experience"],
        "Skills":["skills","technical skills","technologies"],
        "Contact":["email","phone","linkedin","github"]
    }
    return {k:any(x in low for x in v) for k,v in aliases.items()}

def analyze_resume(text):
    skills = extract_skills(text)
    sec = sections(text)
    wc = count_words(text)
    low = text.lower()
    actions = sum(low.count(x) for x in ACTION_WORDS)

    length = 20 if wc >= 500 else 18 if wc >= 300 else 14 if wc >= 180 else 9 if wc >= 100 else 4
    skill_score = 25 if len(skills)>=12 else 21 if len(skills)>=8 else 16 if len(skills)>=5 else 10 if len(skills)>=3 else 5 if skills else 0
    section_score = sum(5 for x in sec.values() if x)
    action_score = 15 if actions>=6 else 10 if actions>=3 else 5 if actions else 0
    score = min(100, length + skill_score + section_score + action_score)

    suggestions = []
    if not sec["Summary"]: suggestions.append("Add a concise professional summary tailored to the target role.")
    if not sec["Experience"]: suggestions.append("Add relevant experience or internships with measurable outcomes.")
    if not sec["Projects"]: suggestions.append("Add 2–4 relevant projects and mention the technologies used.")
    if not sec["Education"]: suggestions.append("Make your education section clear and easy to scan.")
    if len(skills) < 6: suggestions.append("Add relevant technical skills that match the jobs you are targeting.")
    if wc < 180: suggestions.append("Add meaningful achievements, project details or experience to strengthen the resume.")
    if actions < 2: suggestions.append("Start bullet points with strong action verbs and focus on results.")
    if not suggestions: suggestions.append("Strong foundation. Improve bullet points further with measurable results.")

    strengths = []
    if len(skills) >= 8: strengths.append("Strong technical skill coverage")
    if sec["Projects"]: strengths.append("Projects are clearly represented")
    if sec["Education"]: strengths.append("Education section detected")
    if sec["Experience"]: strengths.append("Experience section detected")
    if actions >= 3: strengths.append("Good use of action-oriented language")

    return {
        "score": score,
        "word_count": wc,
        "skills": skills,
        "sections": sec,
        "suggestions": suggestions,
        "strengths": strengths
    }

def normalize_tokens(text):
    stop = set("""a an the and or of to in for on with from by as is are be this that at into using used
    will can should have has had your our their about it its you i we they he she role job work
    experience education skills requirements required""".split())
    return {w for w in re.findall(r"[a-zA-Z][a-zA-Z0-9+#.-]{1,}", text.lower()) if w not in stop and len(w)>2}

def match_job_description(resume, job):
    resume_skills = set(extract_skills(resume))
    job_skills = set(extract_skills(job))
    matched = sorted(resume_skills & job_skills)
    missing = sorted(job_skills - resume_skills)

    resume_tokens = normalize_tokens(resume)
    job_tokens = normalize_tokens(job)
    token_match = len(resume_tokens & job_tokens) / max(1, len(job_tokens))
    skill_match = len(matched) / max(1, len(job_skills)) if job_skills else 0
    score = round((token_match * 55) + (skill_match * 45)) if job_skills else round(token_match * 100)
    score = min(100, score)

    advice = []
    if missing: advice.append("Consider adding relevant missing skills only if you genuinely have them.")
    if score < 60: advice.append("Tailor your summary and project bullets to the job's main responsibilities.")
    if score >= 80: advice.append("Your resume appears well aligned with this job description.")
    if not advice: advice.append("Review the missing keywords and strengthen the most relevant experience bullets.")

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing,
        "job_keywords": sorted(job_tokens & set(SKILLS)),
        "advice": advice
    }
