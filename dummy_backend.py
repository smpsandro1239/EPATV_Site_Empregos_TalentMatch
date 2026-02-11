from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class MockHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        job = {
            "id": "test-job",
            "title": "Software Engineer (AI)",
            "description": "Join our team to build amazing AI recruitment tools.",
            "responsibilities": "- Build features\n- Write tests",
            "requirementsMust": "- TypeScript\n- NestJS",
            "location": "Lisboa, Portugal",
            "level": "SENIOR",
            "contractType": "FULL_TIME",
            "remoteType": "HYBRID",
            "salaryMin": 50000,
            "salaryMax": 70000,
            "company": {
                "id": "test-company",
                "name": "TalentMatch AI",
                "location": "Lisboa",
                "branding": {
                    "primaryColor": "#ff5733",
                    "secondaryColor": "#33ff57"
                }
            },
            "createdAt": "2026-02-01T00:00:00Z",
            "applications": []
        }

        if "candidates-for-job" in self.path:
            self.wfile.write(json.dumps([{"id": "test-candidate", "matchScore": 95, "matchReason": "Excelentes competências técnicas."}]).encode())
        else:
            self.wfile.write(json.dumps(job).encode())

server = HTTPServer(('localhost', 3001), MockHandler)
server.serve_forever()
