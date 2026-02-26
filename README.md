# 🚀 Multi-Agent-Code-Generator

> An AI-powered system that transforms natural language into complete,
> structured, and runnable software projects.

## 🧠 Overview

Multi-Agent-Code-Generator simulates a real development team using a
multi-agent workflow built with **LangGraph**.\
Instead of generating isolated snippets, it follows a structured
engineering pipeline --- planning, architecting, and coding across
multiple files.

Describe your idea.\
The system builds the project.

------------------------------------------------------------------------

## 🏗️ Architecture

### 📝 Planner Agent

-   Interprets the user request\
-   Defines scope and requirements\
-   Generates a structured project blueprint

### 🏛 Architect Agent

-   Breaks the blueprint into file-level engineering tasks\
-   Assigns responsibilities per file\
-   Provides implementation context

### 💻 Coder Agent

-   Implements each task\
-   Writes directly into project files\
-   Maintains structural consistency\
-   Produces runnable output

------------------------------------------------------------------------

## 🔥 Example Prompts

-   Create a to-do list application using HTML, CSS, and JavaScript\
-   Build a simple calculator web application\
-   Create a blog API using FastAPI and SQLite\
-   Generate a REST API with authentication and database integration

------------------------------------------------------------------------

## 🧰 Tech Stack

-   LangGraph -- Multi-agent orchestration\
-   Groq API -- LLM inference\
-   Python -- Core runtime\
-   uv -- Dependency & environment management\
-   python-dotenv -- Environment configuration

------------------------------------------------------------------------

## ⚙️ Installation

``` bash
git clone <your-repo-url>
cd Multi-Agent-Code-Generator

uv venv
source .venv/bin/activate      # macOS / Linux
.venv\Scripts\activate         # Windows

uv pip install -r pyproject.toml
```

Create a `.env` file:

``` env
GROQ_API_KEY=your_api_key_here
```

Run the application:

``` bash
python main.py
```

------------------------------------------------------------------------

## 🎯 Use Cases

-   Rapid prototyping\
-   Automated project scaffolding\
-   AI-assisted software engineering\
-   Multi-agent workflow experimentation

------------------------------------------------------------------------

## 🔐 Security

-   Never commit API keys\
-   Always use environment variables\
-   Rotate keys if exposed

------------------------------------------------------------------------

