const $ = id => document.getElementById(id);
let resumeText = "";

document.querySelectorAll(".nav").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(x => x.classList.remove("active"));
    document.querySelectorAll(".page").forEach(x => x.classList.remove("active-page"));
    btn.classList.add("active");
    $(btn.dataset.target).classList.add("active-page");
  });
});

$("file").addEventListener("change", () => {
  const f = $("file").files[0];
  $("filename").textContent = f ? f.name : "No file selected";
  $("clear").classList.toggle("hidden", !f);
});

$("clear").addEventListener("click", () => {
  $("file").value = "";
  $("filename").textContent = "No file selected";
  $("clear").classList.add("hidden");
});

$("analyze").addEventListener("click", async () => {
  hide($("error")); hide($("results"));
  const f = $("file").files[0];
  if (!f) return show($("error"), "Please select a resume first.");
  const form = new FormData(); form.append("resume", f);
  loading($("analyze"), $("loading"), true);
  try {
    const r = await fetch("/api/analyze", {method:"POST", body:form});
    const d = await r.json();
    if (!r.ok || !d.success) throw new Error(d.message);
    renderAnalysis(d.analysis);
  } catch(e) { show($("error"), e.message || "Analysis failed."); }
  finally { loading($("analyze"), $("loading"), false); }
});

function renderAnalysis(a) {
  $("score").textContent = a.score; $("words").textContent = a.word_count;
  $("skillCount").textContent = a.skills.length;
  $("resultFile").textContent = $("file").files[0]?.name || "";
  setTimeout(()=> $("scorebar").style.width = a.score + "%", 30);

  const skills = $("skills"); skills.innerHTML = "";
  a.skills.forEach(s => skills.appendChild(chip(s)));
  if (!a.skills.length) skills.innerHTML = '<span class="item">No technical skills detected.</span>';

  const sec = $("sections"); sec.innerHTML = "";
  Object.entries(a.sections).forEach(([k,v]) => {
    const el = document.createElement("div"); el.className = "section " + (v ? "ok":"");
    el.textContent = (v ? "✓ ":"○ ") + k; sec.appendChild(el);
  });

  renderItems("strengths", a.strengths, "✓ ");
  renderItems("suggestions", a.suggestions, "→ ");
  show($("results"));
  $("results").scrollIntoView({behavior:"smooth"});
}

$("matchFile").addEventListener("change", () => {
  $("matchFileName").textContent = $("matchFile").files[0]?.name || "Choose resume";
});

$("matchBtn").addEventListener("click", async () => {
  hide($("matchError")); hide($("matchResult"));
  const f = $("matchFile").files[0], job = $("job").value.trim();
  if (!f) return show($("matchError"), "Please choose a resume.");
  if (!job) return show($("matchError"), "Paste a job description first.");

  const form = new FormData(); form.append("resume", f);
  loading($("matchBtn"), $("matchLoading"), true);
  try {
    const r = await fetch("/api/analyze", {method:"POST",body:form});
    const d = await r.json();
    if (!r.ok || !d.success) throw new Error(d.message);
    const text = await getResumeText(f);
    const m = await fetch("/api/match", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body:JSON.stringify({resume_text:text, job_description:job})
    });
    const md = await m.json();
    if (!m.ok || !md.success) throw new Error(md.message);
    renderMatch(md.match);
  } catch(e) { show($("matchError"), e.message || "Matching failed."); }
  finally { loading($("matchBtn"), $("matchLoading"), false); }
});

async function getResumeText(file) {
  if (file.name.toLowerCase().endsWith(".txt")) return await file.text();
  const form = new FormData(); form.append("resume", file);
  const r = await fetch("/api/analyze",{method:"POST",body:form});
  const d = await r.json();
  if (!d.success) throw new Error(d.message);
  return await file.text().catch(()=> "");
}

function renderMatch(m) {
  $("matchScore").textContent = m.score + "%";
  setTimeout(()=> $("matchBar").style.width = m.score + "%", 30);
  renderChips("matched",m.matched_skills,"Matched skills");
  renderChips("missing",m.missing_skills,"No missing skills detected");
  renderItems("advice",m.advice,"→ ");
  show($("matchResult"));
}

function renderChips(id, arr, empty) {
  const box=$(id); box.innerHTML="";
  if(!arr.length){box.innerHTML='<span class="item">'+empty+'</span>';return}
  arr.forEach(x=>box.appendChild(chip(x)));
}
function chip(t){const x=document.createElement("span");x.className="chip";x.textContent=t;return x}
function renderItems(id,arr,prefix){const b=$(id);b.innerHTML="";arr.forEach(x=>{const e=document.createElement("div");e.className="item";e.textContent=prefix+x;b.appendChild(e)})}
function show(e,msg){if(msg)e.textContent=msg;e.classList.remove("hidden")}
function hide(e){e.classList.add("hidden")}
function loading(btn,box,on){box.classList.toggle("hidden",!on);btn.disabled=on}
