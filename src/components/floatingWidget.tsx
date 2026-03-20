/**
 * FloatingWidgets.tsx
 * Stacks the CCC AI chat button above the visitor counter
 * in the bottom-right corner of the screen.
 *
 * Usage in App.tsx:
 *   import FloatingWidgets from './components/FloatingWidgets';
 *   // inside your JSX, anywhere outside <Routes>:
 *   <FloatingWidgets />
 */

import CccAiChat from "./cccAIChat";
import VisitorCounter from "./visitorCounter";
import "../styles/floating.widget.css";

export default function FloatingWidgets() {
  return (
    <div className="floating-widgets">
      {/* CCC AI chat FAB + panel */}
      <CccAiChat />

      {/* Visitor counter pill — sits below the chat FAB */}
      <VisitorCounter />
    </div>
  );
}