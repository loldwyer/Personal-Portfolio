document.addEventListener("DOMContentLoaded", function () {
    const resumeEditor = document.getElementById("resumeEditor");
    const saveButton = document.getElementById("saveResume");

    // Load existing resume content if available
    const savedResume = localStorage.getItem("savedResume") || "Type your resume content here...";
    resumeEditor.innerHTML = savedResume;

    // Save the content to localStorage when clicking save
    saveButton.addEventListener("click", function () {
        localStorage.setItem("savedResume", resumeEditor.innerHTML);
        alert("Resume saved successfully!");
    });

    // Font settings elements
    const resumeFont = document.getElementById("resumeFont");
    const resumeFontSize = document.getElementById("resumeFontSize");
    const resumeColor = document.getElementById("resumeColor");
    const applyResumeStyle = document.getElementById("applyResumeStyle");

    // Apply selected style to highlighted text
    applyResumeStyle.addEventListener("click", () => {
        const selection = window.getSelection();

        if (!selection.rangeCount) return; // No text selected

        const range = selection.getRangeAt(0);
        const span = document.createElement("span");

        // Apply styles
        span.style.fontFamily = resumeFont.value;
        span.style.fontSize = resumeFontSize.value;
        span.style.color = resumeColor.value;

        // Insert formatted span
        const selectedText = range.toString();
        if (selectedText.length === 0) return; // No actual text selected

        span.textContent = selectedText;
        range.deleteContents();
        range.insertNode(span);
    });
});
