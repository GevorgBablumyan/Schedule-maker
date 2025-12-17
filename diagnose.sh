#!/bin/bash
# Quick diagnostic to show what's wrong with OAuth

echo "=================================="
echo "OAuth Diagnostic Check"
echo "=================================="
echo ""

echo "1. Checking .env file..."
echo "---"
cat /Users/user/Desktop/Lesson1/.env | grep -E "GOOGLE_CLIENT_ID|GOOGLE_CLIENT_SECRET"
echo ""

echo "2. Checking if credentials are placeholder values..."
echo "---"
if grep -q "your_client_id_here" /Users/user/Desktop/Lesson1/.env; then
  echo "❌ PROBLEM FOUND: GOOGLE_CLIENT_ID still has placeholder value!"
  echo "   Value: your_client_id_here"
  echo "   Solution: Replace with real Client ID from Google Cloud"
else
  echo "✅ GOOGLE_CLIENT_ID looks real"
fi

if grep -q "your_client_secret_here" /Users/user/Desktop/Lesson1/.env; then
  echo "❌ PROBLEM FOUND: GOOGLE_CLIENT_SECRET still has placeholder value!"
  echo "   Value: your_client_secret_here"
  echo "   Solution: Replace with real Client Secret from Google Cloud"
else
  echo "✅ GOOGLE_CLIENT_SECRET looks real"
fi

echo ""
echo "3. Running Node credential check..."
echo "---"
cd /Users/user/Desktop/Lesson1
node check-credentials.mjs

echo ""
echo "=================================="
echo "If you see ❌ errors above:"
echo "→ Open .env file"
echo "→ Replace placeholder values with real credentials from Google Cloud"
echo "→ Run: node check-credentials.mjs again"
echo "=================================="
