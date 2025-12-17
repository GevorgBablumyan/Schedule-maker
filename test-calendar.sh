#!/bin/bash

# Test script to verify the calendar system works

echo "🧪 Testing Custom Calendar System..."
echo "======================================"
echo ""

# Test 1: Check if server is running
echo "✓ Test 1: Check if server is running..."
if curl -s http://localhost:3000 > /dev/null; then
  echo "  ✅ Server is responding"
else
  echo "  ❌ Server is not responding"
  exit 1
fi

echo ""

# Test 2: Test AI endpoint
echo "✓ Test 2: Test AI response endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Monday 9:30-15:40 College, 19:00-21:00 Gym"}')

if echo "$RESPONSE" | grep -q "College\|Gym\|reply"; then
  echo "  ✅ AI endpoint working"
  echo "  Response sample: $(echo $RESPONSE | cut -c1-100)..."
else
  echo "  ❌ AI endpoint not working"
fi

echo ""

# Test 3: Test calendar save endpoint
echo "✓ Test 3: Test calendar save endpoint..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/calendar/save-schedule \
  -H "Content-Type: application/json" \
  -d '{"scheduleText":"Monday 9:30-15:40 College, 19:00-21:00 Gym","email":"gevorgbablumyan43@gmail.com"}')

if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "  ✅ Calendar save endpoint working"
  CREATED=$(echo "$RESPONSE" | grep -o '"created":[0-9]*' | grep -o '[0-9]*')
  echo "  Created $CREATED events"
else
  echo "  ❌ Calendar save endpoint not working"
  echo "  Response: $RESPONSE"
fi

echo ""

# Test 4: Test calendar retrieve endpoint
echo "✓ Test 4: Test calendar retrieve endpoint..."
RESPONSE=$(curl -s "http://localhost:3000/api/calendar/saved-events?email=gevorgbablumyan43@gmail.com")

if echo "$RESPONSE" | grep -q '"events"'; then
  echo "  ✅ Calendar retrieve endpoint working"
  COUNT=$(echo "$RESPONSE" | grep -o '"count":[0-9]*' | grep -o '[0-9]*')
  echo "  Found $COUNT events"
else
  echo "  ❌ Calendar retrieve endpoint not working"
  echo "  Response: $RESPONSE"
fi

echo ""

# Test 5: Check if calendar files exist
echo "✓ Test 5: Check calendar files..."
if [ -f "./calendars/events.json" ]; then
  echo "  ✅ Calendar file exists"
  FILE_SIZE=$(wc -c < ./calendars/events.json)
  echo "  File size: $FILE_SIZE bytes"
else
  echo "  ❌ Calendar file missing (Note: This is expected if no events are saved yet)"
fi

echo ""
echo "======================================"
echo "✅ All tests completed!"
echo ""
echo "🌐 Website ready: http://localhost:3000"
