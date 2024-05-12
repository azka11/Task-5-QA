import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  vus: 1000, // Jumlah pengguna virtual
  iterations: 3500, // Durasi uji
  thresholds: {
    http_req_duration: ["p(95)<2000"],
  }
};

export default function () {
  // Test POST API Performance
  let payloadPost = JSON.stringify({
    name: 'John Doe',
    job: 'Software Engineer'
  });

  let postResponse = http.post('http://localhost:3000/api/users', payloadPost, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  check(postResponse, {
    'Create API POST is status 201': (r) => r.status === 201,
  });

  sleep(1);

  // Test PUT API Performance
  let payloadPut = JSON.stringify({
    name: 'Jane Doe',
    job: 'Product Manager'
  });

  let putResponse = http.put('http://localhost:3000/api/users/2', payloadPut, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  check(putResponse, {
    'Create API PUT is status 200': (r) => r.status === 200,
  });

  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}