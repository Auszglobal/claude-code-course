const PROMPT_TEMPLATES = [
  {
    category: 'Image Creation',
    icon: '&#x1F3A8;',
    templates: [
      { title: 'Product photo', prompt: 'Generate a photorealistic product photo of [product description] on a clean white background, studio lighting, high resolution, commercial quality.', tags: ['image', 'product'] },
      { title: 'Social media graphic', prompt: 'Create a vibrant [Instagram/Facebook] post image about [topic]. Use [brand colours]. Include space for text overlay. Style: modern, clean, eye-catching. Aspect ratio: 1:1.', tags: ['image', 'social'] },
      { title: 'Logo design', prompt: 'Design a minimalist logo for a [business type] called "[name]". Style: [modern/classic/playful]. Colours: [preferences]. The logo should work at small sizes and on dark backgrounds.', tags: ['image', 'logo'] },
      { title: 'Banner/header image', prompt: 'Create a professional website banner for a [business type]. Include visual elements related to [theme]. Style: [corporate/creative/tech]. Dimensions: 1200x400 pixels.', tags: ['image', 'banner'] },
      { title: 'Edit existing image', prompt: 'Take this image and [remove the background / change the background to a beach / add a sunset sky / make it look like a watercolor painting / remove the person on the left].', tags: ['image', 'edit'] }
    ]
  },
  {
    category: 'Video & Content',
    icon: '&#x1F3AC;',
    templates: [
      { title: 'Video script (30s)', prompt: 'Write a 30-second video script for [platform: TikTok/Reels/Shorts] about [topic].\n\nFormat:\n- Hook (first 3 seconds)\n- Main content (3 key points)\n- Call to action\n\nTone: [casual/professional/funny]', tags: ['video', 'script'] },
      { title: 'Content calendar', prompt: 'Create a 7-day social media content calendar for a [business type].\n\nFor each day include:\n- Platform (Instagram, LinkedIn, TikTok)\n- Content type (reel, carousel, story, post)\n- Topic/hook\n- Caption draft\n- Hashtags (5-10)\n- Best posting time', tags: ['video', 'calendar'] },
      { title: 'YouTube description', prompt: 'Write a YouTube video description for a video about [topic].\n\nInclude:\n- Compelling first 2 lines (shown in search)\n- Key timestamps/chapters\n- 3 relevant links/resources\n- Call to subscribe\n- 15 relevant tags', tags: ['video', 'youtube'] },
      { title: 'Video storyboard', prompt: 'Create a storyboard for a [duration] video about [topic].\n\nFor each scene:\n- Scene number and duration\n- Visual description (what the viewer sees)\n- Audio/voiceover text\n- Text overlay\n- Camera angle/movement', tags: ['video', 'storyboard'] },
      { title: 'Analyse my video', prompt: 'Watch this video and provide:\n1. Summary (3 sentences)\n2. Key moments with timestamps\n3. Transcript of all spoken content\n4. Suggested improvements for engagement\n5. SEO-friendly title and description', tags: ['video', 'analyse'] }
    ]
  },
  {
    category: 'Google Workspace',
    icon: '&#x1F4BC;',
    templates: [
      { title: 'Email draft', prompt: 'Draft a [professional/friendly] email to [recipient] about [topic].\n\nKey points to cover:\n- [point 1]\n- [point 2]\n- [point 3]\n\nTone: [formal/casual]. Include a clear call to action.', tags: ['workspace', 'email'] },
      { title: 'Meeting summary', prompt: 'Convert these meeting notes into a structured summary:\n\n[paste notes]\n\nFormat:\n- Meeting objective\n- Key decisions made\n- Action items (who, what, deadline)\n- Next steps', tags: ['workspace', 'meeting'] },
      { title: 'Spreadsheet formula', prompt: 'I have a Google Sheet with columns: [list columns].\n\nI need a formula that [describe what you want to calculate].\n\nGive me the exact formula and explain how it works step by step.', tags: ['workspace', 'sheets'] },
      { title: 'Presentation outline', prompt: 'Create a presentation outline for [topic] with [N] slides.\n\nAudience: [who]\nGoal: [convince/inform/teach]\n\nFor each slide: title, 3-4 bullet points, suggested visual, speaker notes.', tags: ['workspace', 'slides'] },
      { title: 'Report from data', prompt: 'Analyse this data and write a business report:\n\n[paste data or describe dataset]\n\nInclude:\n- Executive summary (3 sentences)\n- Key findings with numbers\n- Trends and patterns\n- Recommendations (3-5 actionable items)', tags: ['workspace', 'report'] }
    ]
  },
  {
    category: 'Business & Marketing',
    icon: '&#x1F4B0;',
    templates: [
      { title: 'Blog post (SEO)', prompt: 'Write a 1000-word blog post about "[topic]" targeting the keyword "[keyword]".\n\nRequirements:\n- SEO title (under 60 chars)\n- Meta description (under 160 chars)\n- H2 and H3 subheadings\n- Include keyword naturally 3-5 times\n- End with a call to action', tags: ['business', 'seo'] },
      { title: 'Customer reply', prompt: 'A customer sent this message:\n\n"[paste customer message]"\n\nDraft a [empathetic/professional] reply that:\n- Acknowledges their concern\n- Provides a solution or next steps\n- Maintains a positive tone\n- Offers additional help', tags: ['business', 'support'] },
      { title: 'Product description', prompt: 'Write a compelling product description for [product name].\n\nFeatures: [list features]\nTarget audience: [who]\n\nInclude:\n- Attention-grabbing headline\n- 3 benefit-focused paragraphs\n- Technical specs\n- Call to action', tags: ['business', 'product'] },
      { title: 'Competitor analysis', prompt: 'Analyse the competitive landscape for [business/product] in [market].\n\nFor each of the top 3-5 competitors, identify:\n- Their strengths and weaknesses\n- Pricing strategy\n- Target audience\n- Unique selling proposition\n- Gaps we can exploit', tags: ['business', 'analysis'] },
      { title: 'Social media captions', prompt: 'Write 5 social media captions for [product/event/topic].\n\nPlatform: [Instagram/LinkedIn/Twitter]\nTone: [professional/casual/witty]\n\nEach caption should:\n- Start with a hook\n- Include a call to action\n- Have 5-10 relevant hashtags\n- Be under [character limit]', tags: ['business', 'social'] }
    ]
  },
  {
    category: 'Data & Analysis',
    icon: '&#x1F4CA;',
    templates: [
      { title: 'Analyse CSV data', prompt: 'Analyse this dataset:\n\n[paste data or describe]\n\n1. What are the key trends?\n2. Are there any outliers or anomalies?\n3. What correlations exist between columns?\n4. Create a summary table of key metrics\n5. What predictions can you make?', tags: ['data', 'analysis'] },
      { title: 'Survey results', prompt: 'Analyse these survey responses:\n\n[paste data]\n\nProvide:\n- Response rate and demographics\n- Key findings (top 5)\n- Sentiment analysis\n- Comparison between groups\n- Actionable recommendations', tags: ['data', 'survey'] },
      { title: 'Financial summary', prompt: 'Create a financial summary from this data:\n\n[paste financial data]\n\nInclude:\n- Revenue and expense breakdown\n- Month-over-month growth rate\n- Top performing categories\n- Areas of concern\n- Budget recommendations', tags: ['data', 'finance'] },
      { title: 'Chart suggestions', prompt: 'I have data about [describe dataset] with columns [list columns].\n\nSuggest the best 3 chart types to visualise this data.\nFor each: chart type, what it shows, which columns to use, and why it\'s effective.', tags: ['data', 'visualise'] }
    ]
  },
  {
    category: 'Maps & Location',
    icon: '&#x1F5FA;',
    templates: [
      { title: 'Trip planner', prompt: 'Plan a [N]-day trip to [destination].\n\nPreferences: [budget/luxury], [adventure/relaxation], [food interests]\n\nFor each day:\n- Morning, afternoon, evening activities\n- Specific restaurant recommendations\n- Travel time between locations\n- Estimated costs\n- Google Maps links if possible', tags: ['maps', 'travel'] },
      { title: 'Restaurant finder', prompt: 'Find the best [cuisine type] restaurants near [location].\n\nFor each recommendation:\n- Name and address\n- Rating and price range\n- What they\'re known for\n- Best dishes to order\n- Booking tips', tags: ['maps', 'restaurant'] },
      { title: 'Store location analysis', prompt: 'Analyse potential locations for a [business type] in [area].\n\nConsider:\n- Foot traffic and accessibility\n- Nearby competitors\n- Demographics of surrounding area\n- Parking availability\n- Rent estimates\n- Pros and cons of each location', tags: ['maps', 'business'] },
      { title: 'Delivery route', prompt: 'Optimise delivery routes for [N] stops:\n\n[list addresses]\n\nStarting from: [depot address]\nVehicle: [type]\n\nProvide: optimal order, estimated drive time, total distance, and any time-of-day considerations.', tags: ['maps', 'logistics'] }
    ]
  },
  {
    category: 'Advanced / API',
    icon: '&#x1F9E0;',
    templates: [
      { title: 'Function calling setup', prompt: 'Create a Gemini function calling example in Python that:\n\n1. Defines a function called [name] that [does what]\n2. Takes parameters: [list params]\n3. The model decides when to call it\n4. Include the complete working code with error handling', tags: ['api', 'function'] },
      { title: 'RAG system prompt', prompt: 'You are a helpful assistant for [company/domain].\nAnswer questions using ONLY the context provided below.\nIf the answer is not in the context, say "I don\'t have that information."\nAlways cite which section the answer came from.\n\nContext:\n[paste document chunks]', tags: ['api', 'rag'] },
      { title: 'Multimodal analysis', prompt: 'Analyse this [image/document/screenshot] and:\n\n1. Extract all relevant information\n2. Identify any issues or errors\n3. Suggest improvements\n4. Generate a structured JSON output with your findings\n5. Provide actionable next steps', tags: ['api', 'multimodal'] },
      { title: 'Batch processing script', prompt: 'Write a Python script that:\n1. Reads all [file type] files from a directory\n2. Sends each to Gemini API with the prompt: "[your prompt]"\n3. Saves results to a CSV file\n4. Includes rate limiting (2 requests/second)\n5. Has error handling and progress display', tags: ['api', 'batch'] },
      { title: 'Agent system prompt', prompt: 'You are an AI agent that helps with [task].\n\nYou have access to these tools:\n- [tool 1]: [description]\n- [tool 2]: [description]\n\nFor each user request:\n1. Plan your approach\n2. Use the appropriate tool(s)\n3. Verify the result\n4. Provide a clear summary\n\nAlways explain your reasoning before taking action.', tags: ['api', 'agent'] }
    ]
  }
];
