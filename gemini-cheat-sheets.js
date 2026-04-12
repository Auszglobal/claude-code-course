const CHEAT_SHEETS = {
  'phase-1': {
    title: 'Getting Started',
    sections: [
      {
        heading: 'Google AI Studio',
        items: [
          { cmd: 'aistudio.google.com', desc: 'Open Google AI Studio (free web UI)' },
          { cmd: 'Get API Key', desc: 'Click "Get API Key" button in AI Studio top menu' },
          { cmd: 'System Instructions', desc: 'Set persistent AI behaviour rules in the left panel' },
          { cmd: 'Temperature slider', desc: 'Adjust creativity: 0 = precise, 1 = creative' },
          { cmd: 'Model selector', desc: 'Choose Flash (fast), Pro (balanced), or Ultra (powerful)' },
        ]
      },
      {
        heading: 'Python SDK Setup',
        items: [
          { cmd: 'pip install google-generativeai', desc: 'Install the Gemini Python SDK' },
          { cmd: 'import google.generativeai as genai', desc: 'Import the SDK in Python' },
          { cmd: 'genai.configure(api_key="YOUR_KEY")', desc: 'Set your API key' },
          { cmd: 'model = genai.GenerativeModel("gemini-2.0-flash")', desc: 'Create a model instance' },
          { cmd: 'response = model.generate_content("prompt")', desc: 'Generate a response' },
          { cmd: 'print(response.text)', desc: 'Access the response text' },
        ]
      },
      {
        heading: 'Gemini CLI',
        items: [
          { cmd: 'npm install -g @anthropic-ai/gemini-cli', desc: 'Install Gemini CLI globally' },
          { cmd: 'gemini', desc: 'Start interactive mode' },
          { cmd: 'gemini "your prompt"', desc: 'Run a one-shot command' },
          { cmd: 'Ctrl+C', desc: 'Cancel current operation' },
        ]
      }
    ]
  },
  'phase-2': {
    title: 'Text & Code',
    sections: [
      {
        heading: 'Prompting Techniques',
        items: [
          { cmd: 'System Instructions', desc: 'Persistent rules: "You are a Python expert. Always use type hints."' },
          { cmd: 'Few-shot', desc: 'Give 2-3 examples of input→output before your actual request' },
          { cmd: 'Chain-of-thought', desc: 'Add "Think step by step" for complex reasoning tasks' },
          { cmd: 'temperature=0', desc: 'Deterministic output — same input always gives same result' },
          { cmd: 'temperature=1', desc: 'Maximum creativity — varied and unexpected outputs' },
          { cmd: 'max_output_tokens', desc: 'Limit response length to control costs' },
        ]
      },
      {
        heading: 'Code Assist (VS Code)',
        items: [
          { cmd: 'Tab', desc: 'Accept code suggestion' },
          { cmd: 'Esc', desc: 'Dismiss suggestion' },
          { cmd: 'Ctrl+I / Cmd+I', desc: 'Open inline chat for code generation' },
          { cmd: 'Right-click → Explain', desc: 'Get explanation of selected code' },
          { cmd: 'Right-click → Generate', desc: 'Generate code from description' },
        ]
      },
      {
        heading: 'Long Context',
        items: [
          { cmd: '2,000,000 tokens', desc: 'Gemini\'s context window — largest in the industry' },
          { cmd: 'genai.upload_file(path)', desc: 'Upload a file via the File API' },
          { cmd: 'model.count_tokens(text)', desc: 'Check how many tokens a text uses' },
          { cmd: 'Drag & drop in AI Studio', desc: 'Upload documents directly in the web UI' },
        ]
      }
    ]
  },
  'phase-3': {
    title: 'Images',
    sections: [
      {
        heading: 'Image Understanding',
        items: [
          { cmd: 'PIL.Image.open("photo.jpg")', desc: 'Load an image for analysis' },
          { cmd: 'model.generate_content([prompt, image])', desc: 'Send image + text prompt together' },
          { cmd: '"Describe this image in detail"', desc: 'General image analysis prompt' },
          { cmd: '"Extract all text from this image"', desc: 'OCR — read text from photos' },
          { cmd: '"Compare these two images"', desc: 'Send multiple images for comparison' },
        ]
      },
      {
        heading: 'Image Generation (Imagen 3)',
        items: [
          { cmd: '"photorealistic"', desc: 'Style keyword for photo-like images' },
          { cmd: '"illustration"', desc: 'Style keyword for drawn/artistic images' },
          { cmd: '"3D render"', desc: 'Style keyword for 3D-rendered images' },
          { cmd: '"watercolor painting"', desc: 'Style keyword for watercolor style' },
          { cmd: 'Negative prompt', desc: 'Describe what to exclude: "no text, no watermark"' },
          { cmd: 'Aspect ratio', desc: 'Specify dimensions: "16:9", "1:1", "9:16"' },
        ]
      }
    ]
  },
  'phase-4': {
    title: 'Video',
    sections: [
      {
        heading: 'Video Generation (Veo 2)',
        items: [
          { cmd: 'Scene description', desc: 'Describe the setting: "A cozy cafe at sunset"' },
          { cmd: 'Camera angle', desc: 'Specify shot: "wide angle", "close-up", "aerial view"' },
          { cmd: 'Camera movement', desc: 'Specify motion: "slow pan right", "dolly forward"' },
          { cmd: 'Style', desc: 'Set look: "cinematic", "documentary", "animated"' },
          { cmd: '5-15 seconds', desc: 'Optimal clip length for best quality' },
        ]
      },
      {
        heading: 'Video Analysis',
        items: [
          { cmd: 'genai.upload_file("video.mp4")', desc: 'Upload video for analysis' },
          { cmd: '"Summarise this video"', desc: 'Get a text summary of video content' },
          { cmd: '"List key moments with timestamps"', desc: 'Extract important moments' },
          { cmd: '"Transcribe the speech"', desc: 'Convert spoken words to text' },
        ]
      },
      {
        heading: 'YouTube & Short-Form',
        items: [
          { cmd: '"Generate chapters for this video"', desc: 'Auto-create timestamp chapters' },
          { cmd: '"Write a description with keywords"', desc: 'SEO-friendly video description' },
          { cmd: '"Suggest 10 tags"', desc: 'Generate relevant video tags' },
          { cmd: '"Write a 30-second script about [topic]"', desc: 'Short-form video script' },
          { cmd: '"Create a 7-day content calendar"', desc: 'Plan a week of short-form content' },
        ]
      }
    ]
  },
  'phase-5': {
    title: 'Google Workspace',
    sections: [
      {
        heading: 'Gmail',
        items: [
          { cmd: '"Help me write"', desc: 'Built-in Gemini in Gmail — draft from bullets' },
          { cmd: '"Summarise this thread"', desc: 'Get key points from long email chains' },
          { cmd: '"Make it more formal"', desc: 'Adjust email tone' },
          { cmd: 'Smart Reply', desc: 'AI-suggested short responses' },
        ]
      },
      {
        heading: 'Docs & Sheets',
        items: [
          { cmd: '"Help me write" in Docs', desc: 'Generate content from a prompt' },
          { cmd: '"Help me organise" in Sheets', desc: 'Generate formulas and analyse data' },
          { cmd: '"Create a chart showing..."', desc: 'Natural language chart creation in Sheets' },
          { cmd: '"Translate to Japanese"', desc: 'Translate selected text in Docs' },
        ]
      },
      {
        heading: 'Apps Script',
        items: [
          { cmd: 'script.google.com', desc: 'Open Apps Script editor' },
          { cmd: 'UrlFetchApp.fetch(url)', desc: 'Make HTTP requests (call Gemini API)' },
          { cmd: 'ScriptApp.newTrigger()', desc: 'Create scheduled or event-based triggers' },
          { cmd: 'SpreadsheetApp.getActive()', desc: 'Access current spreadsheet' },
          { cmd: 'GmailApp.sendEmail()', desc: 'Send emails programmatically' },
        ]
      }
    ]
  },
  'phase-6': {
    title: 'Google Maps',
    sections: [
      {
        heading: 'Maps API',
        items: [
          { cmd: 'console.cloud.google.com', desc: 'Get Maps API key from Google Cloud Console' },
          { cmd: 'Maps JavaScript API', desc: 'Embed interactive maps in webpages' },
          { cmd: 'pip install googlemaps', desc: 'Install Python Maps client library' },
          { cmd: 'gmaps.geocode("address")', desc: 'Convert address to coordinates' },
          { cmd: 'gmaps.reverse_geocode((lat,lng))', desc: 'Convert coordinates to address' },
        ]
      },
      {
        heading: 'Places & Routes',
        items: [
          { cmd: 'gmaps.places_nearby(location, radius)', desc: 'Find nearby businesses' },
          { cmd: 'gmaps.place(place_id)', desc: 'Get detailed info about a place' },
          { cmd: 'gmaps.directions(origin, destination)', desc: 'Get route between two points' },
          { cmd: 'gmaps.distance_matrix(origins, destinations)', desc: 'Travel times between multiple points' },
          { cmd: 'type="restaurant"', desc: 'Filter places by type: restaurant, cafe, hospital, etc.' },
        ]
      }
    ]
  },
  'phase-7': {
    title: 'Business Applications',
    sections: [
      {
        heading: 'Customer Service',
        items: [
          { cmd: '"Categorise this inquiry"', desc: 'Auto-classify: billing, technical, general' },
          { cmd: '"Draft a response"', desc: 'Generate professional customer replies' },
          { cmd: '"Analyse sentiment"', desc: 'Detect frustrated, neutral, or satisfied tone' },
          { cmd: 'FAQ bot prompt', desc: '"Answer ONLY from the FAQ below. If unsure, say I\'ll escalate."' },
        ]
      },
      {
        heading: 'Content & SEO',
        items: [
          { cmd: '"Research keywords for [topic]"', desc: 'Find relevant SEO keywords' },
          { cmd: '"Write a 1000-word blog post"', desc: 'Generate long-form SEO content' },
          { cmd: '"Write meta description (under 160 chars)"', desc: 'SEO meta description' },
          { cmd: '"Analyse top 3 competitors for [keyword]"', desc: 'Competitive content analysis' },
          { cmd: '"Create a content calendar for [month]"', desc: 'Plan monthly content strategy' },
        ]
      },
      {
        heading: 'Data Analysis',
        items: [
          { cmd: 'Upload CSV in AI Studio', desc: 'Drag & drop data files for analysis' },
          { cmd: '"What are the trends in this data?"', desc: 'Identify patterns and trends' },
          { cmd: '"Create a summary report"', desc: 'Generate business report from data' },
          { cmd: '"Which month had highest revenue?"', desc: 'Natural language data queries' },
        ]
      }
    ]
  },
  'phase-8': {
    title: 'Advanced Development',
    sections: [
      {
        heading: 'Function Calling',
        items: [
          { cmd: 'tools=[function_def]', desc: 'Pass function definitions when creating model' },
          { cmd: 'response.candidates[0].content.parts', desc: 'Check for function call in response' },
          { cmd: 'genai.protos.FunctionDeclaration', desc: 'Define a function schema for Gemini' },
          { cmd: 'function_response', desc: 'Send function result back to Gemini for final answer' },
        ]
      },
      {
        heading: 'RAG (Retrieval Augmented Generation)',
        items: [
          { cmd: 'genai.embed_content()', desc: 'Create text embeddings for document chunks' },
          { cmd: 'Chunk size: 500-1000 tokens', desc: 'Optimal chunk size for retrieval accuracy' },
          { cmd: 'Cosine similarity', desc: 'Compare embedding vectors to find relevant chunks' },
          { cmd: '"Answer using ONLY the context below"', desc: 'RAG prompt template for grounded answers' },
        ]
      },
      {
        heading: 'Vertex AI & Mobile',
        items: [
          { cmd: 'vertexai.init(project, location)', desc: 'Initialize Vertex AI in Python' },
          { cmd: 'Gemini Nano', desc: 'On-device model for Android — no internet needed' },
          { cmd: 'flutter pub add google_generative_ai', desc: 'Add Gemini to Flutter mobile app' },
          { cmd: 'model.generateContentStream()', desc: 'Stream responses for real-time chat UX' },
        ]
      }
    ]
  },
};
