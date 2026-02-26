# Multi-Agent-Code-Generator

> An AI-powered system that transforms natural language into complete,
> structured, and runnable software projects.

------------------------------------------------------------------------

## Overview

Multi-Agent-Code-Generator simulates a real development team using a
structured multi-agent workflow built with **LangGraph**.\
Instead of generating isolated snippets, it follows a disciplined
engineering pipeline --- planning, architecting, and coding across
multiple files.

------------------------------------------------------------------------

## System Flow Diagram

``` mermaid
flowchart TD
    A[User Prompt] --> B[Planner Agent]
    B --> C[Project Blueprint]
    C --> D[Architect Agent]
    D --> E[File-Level Engineering Tasks]
    E --> F[Coder Agent]
    F --> G[Structured Codebase Output]
    G --> H[Runnable Application]
```

------------------------------------------------------------------------

## Architecture

### Planner Agent

-   Interprets the user request\
-   Defines scope and requirements\
-   Generates a structured project blueprint

### Architect Agent

-   Breaks the blueprint into file-level engineering tasks\
-   Assigns responsibilities per file\
-   Provides implementation context

### Coder Agent

-   Implements each task\
-   Writes directly into project files\
-   Maintains structural consistency\
-   Produces runnable output

------------------------------------------------------------------------

## Example Prompts

-   Create a to-do list application using HTML, CSS, and JavaScript\
-   Build a simple calculator web application\
-   Create a blog API using FastAPI and SQLite\
-   Generate a REST API with authentication and database integration

------------------------------------------------------------------------

## Tech Stack

-   LangGraph -- Multi-agent orchestration\
-   Groq API -- LLM inference\
-   Python -- Core runtime\
-   uv -- Dependency & environment management\
-   python-dotenv -- Environment configuration

------------------------------------------------------------------------

## Installation

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

## Security

-   Never commit API keys\
-   Always use environment variables\
-   Rotate keys if exposed

------------------------------------------------------------------------

## License

Add your license information here.
