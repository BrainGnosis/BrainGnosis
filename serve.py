#!/usr/bin/env python3
"""
Simple HTTP server with clean URL support for local development
"""
import http.server
import socketserver
import os
from urllib.parse import urlparse

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse(self.path)
        path = parsed_path.path
        
        # Remove trailing slash except for root
        if path != '/' and path.endswith('/'):
            path = path[:-1]
        
        # Handle root path
        if path == '/' or path == '':
            path = '/index.html'
        
        # Handle clean URLs - add .html if file exists
        if not path.endswith('.html') and not '.' in os.path.basename(path):
            html_path = path + '.html'
            if os.path.exists('.' + html_path):
                path = html_path
        
        self.path = path
        return super().do_GET()

def run_server(port=8000):
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"Serving at http://localhost:{port}")
        print("Clean URLs enabled - no .html extensions needed!")
        httpd.serve_forever()

if __name__ == "__main__":
    run_server()
