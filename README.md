# AI Security Sentinel

An interactive, educational web application that visualizes how artificial intelligence detects and responds to cybersecurity threats in real time.

## Live Demo

```bash
npm install --legacy-peer-deps
npm run dev
```

## Features

### Threat Detection Scenarios
- **Malware Attack** - Simulates malicious software detection
- **Phishing Attempt** - Email/web phishing detection
- **DDoS Attack** - Distributed denial of service simulation
- **Insider Threat** - Suspicious internal activity detection
- **Normal Traffic** - Safe traffic baseline

### AI Analysis Pipeline
Watch the complete analysis flow in real-time:
1. **Packet Capture** - Network traffic interception
2. **Feature Extraction** - Behavioral pattern identification
3. **AI Model Inference** - Neural network processing
4. **Threat Classification** - Security decision making
5. **Automated Response** - Policy enforcement

### Interactive Visualizations
- **Neural Network Animation** - 4-layer network with pulsating neurons
- **Pipeline Flow Diagram** - Step-by-step progress indicators
- **Real-time Metrics Dashboard** - Performance statistics
- **Detection Event Feed** - Live threat log

### User Authentication
- Sign up / Log in functionality
- Personal detection history
- Persistent user sessions

### Performance Metrics
- Detection Latency (ms)
- Accuracy (%)
- Total Detections
- Threats Blocked
- False Positives

### Sound Effects
- Web Audio API integration
- Different tones for threat levels
- No external audio files needed

### Data Export
- **CSV format** - Spreadsheet-ready reports
- **JSON format** - Programmatic data access
- Includes complete event history and metrics

### WebSocket Simulation
- Automatic random threat generation
- 5-10 second intervals
- Real-time status indicator

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Framer Motion** - Smooth animations
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Web Audio API** - Sound effects

## Installation

```bash
# Clone the repository
cd "AI Security Demo"

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

## How to Use

1. **Launch the app** - The WebSocket connects automatically
2. **Sign up** (optional) - Create an account to save history
3. **Select a threat** - Click any of the 5 scenario buttons
4. **Watch the magic** - See the AI pipeline animate
5. **Hear the result** - Audio feedback on completion
6. **View metrics** - Check updated performance stats
7. **Export data** - Download CSV or JSON reports

## Project Structure

```
src/
├── components/
│   ├── AIAnalysisFlow.tsx      # Main visualization
│   ├── Auth.tsx                # Authentication
│   ├── PerformanceMetrics.tsx  # Metrics dashboard
│   ├── ReportGenerator.tsx     # Export functionality
│   └── mockWebSocket.ts        # Real-time simulation
├── store/
│   ├── demoStore.ts            # App state
│   └── authStore.ts            # User state
├── types/
│   └── index.ts                # TypeScript types
├── utils/
│   ├── sound.ts                # Audio effects
│   └── report.ts               # Data export
├── App.tsx                     # Root component
├── main.tsx                    # Entry point
└── index.css                   # Global styles
```

## Design Highlights

- **Dark Mode UI** - Professional cybersecurity aesthetic
- **Gradient Animations** - Smooth color transitions
- **Responsive Layout** - Works on all screen sizes
- **Micro-interactions** - Hover effects and feedback
- **Glass Morphism** - Modern backdrop blur effects

## Deployment

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

##  Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)
- State management by [Zustand](https://github.com/pmndrs/zustand)

---

⭐ **Star this project** if you find it helpful!
