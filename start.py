#!/usr/bin/env python3
"""Local development server for MAGIC Evidence website."""

import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8311
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

os.chdir(DIRECTORY)

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    url = f"http://localhost:{PORT}"
    print(f"Serving at {url}")
    print("Press Ctrl+C to stop")
    webbrowser.open(url)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
