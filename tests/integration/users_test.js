import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default function () {
  // Scenario: Integration Test for POST API
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
    'POST request is successful': (r) => r.status === 201,
    // Add more assertions as needed
  });

  // Scenario: Integration Test for PUT API
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
    'PUT request is successful': (r) => r.status === 200,
    // Add more assertions as needed
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}