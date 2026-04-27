[README.md](https://github.com/user-attachments/files/27110175/README.md)
# ✨ AI Grammar Checker

> An intelligent web application that analyzes and corrects grammar using the **Groq API** powered by **LLaMA 3.1**. It provides not just corrections, but also detailed explanations, summaries, and text insights — all in a simple and user-friendly interface.

![Python](https://img.shields.io/badge/Python-3.8+-blue?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-2.3.3-black?style=for-the-badge&logo=flask&logoColor=white)
![Groq](https://img.shields.io/badge/Groq-LLaMA%203.1-purple?style=for-the-badge&logo=openai&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🚀 Features

- ✅ **Accurate Grammar & Spelling Correction**
- 🧠 **AI-Powered Analysis** (LLaMA 3.1 via Groq)
- 📊 **Detailed Error Breakdown** with Explanations
- ✍️ **Clean Corrected Output**
- 🔢 **Word & Character Count**
- ⚡ **Fast and Responsive UI**
- ⌨️ **Keyboard Shortcut Support** (`Ctrl + Enter`)

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Flask (Python) |
| AI Model | LLaMA 3.1 (via Groq API) |
| Frontend | HTML, CSS, JavaScript |
| Environment | python-dotenv |

---

## 📦 Prerequisites

Before running the project, ensure you have:

- Python **3.8** or higher
- A valid **Groq API Key** — get one at [console.groq.com](https://console.groq.com/)

---

## ⚙️ Installation & Setup

**1️⃣ Clone the Repository**
```bash
git clone <your-repository-url>
cd <your-project-folder>
```

**2️⃣ Create Virtual Environment**
```bash
python -m venv venv
```

Activate it:

- Windows:
```bash
venv\Scripts\activate
```
- macOS/Linux:
```bash
source venv/bin/activate
```

**3️⃣ Install Dependencies**
```bash
pip install -r requirements.txt
```

**4️⃣ Configure Environment Variables**

Create a `.env` file in the root directory and add:
```env
GROQ_API_KEY=your_api_key_here
```

**5️⃣ Run the Application**
```bash
python app.py
```

**6️⃣ Open in Browser**
```
http://127.0.0.1:5000
```

---

## 💡 Usage

1. Enter or paste your text into the editor
2. Click **"Check Grammar"** or press `Ctrl + Enter`
3. View your results:
   - ✔️ Corrected text
   - ❌ List of grammar errors
   - 📘 Explanations
   - 📊 Summary

---

## 📁 Project Structure

```
├── app.py
├── requirements.txt
├── .env
├── static/
│   ├── script.js
│   └── style.css
├── templates/
│   └── index.html
└── README.md
```

---

## 🎯 Key Highlights

- Integrated **LLM API (Groq)** into a real-world application
- Implemented **text analysis pipeline** with structured JSON responses
- Built a **full-stack AI-powered web app** from scratch
- Focused on **user experience** + explainability

---

## 🔮 Future Improvements

- 🌍 Multi-language support
- 🧾 Downloadable reports (PDF/Docx)
- 📈 Writing score & readability metrics
- 🔊 Voice input support

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

## 💬 Author

**Prit Patel**
*AI Enthusiast | Computer Vision | ML Developer*
