# Design Guidelines: Document Generation Application

## Design Approach
**Selected Approach**: Design System - Microsoft Fluent Design  
**Justification**: This is a productivity-focused, data-intensive application requiring clarity, efficiency, and professional polish. Fluent Design excels at form-heavy workflows, data editing, and enterprise tools.

**Core Principles**:
- Clarity over decoration - every element serves a purpose
- Progressive disclosure - reveal complexity as needed
- Immediate feedback - users always know their status
- Professional trustworthiness - this handles important documents

## Typography
- **Primary Font**: Inter (Google Fonts) - clean, readable, professional
- **Headings**: 
  - H1: 2.5rem (40px), font-weight 700
  - H2: 1.875rem (30px), font-weight 600
  - H3: 1.5rem (24px), font-weight 600
- **Body Text**: 1rem (16px), font-weight 400, line-height 1.6
- **Form Labels**: 0.875rem (14px), font-weight 500, uppercase tracking-wide
- **Helper Text**: 0.875rem (14px), font-weight 400

## Layout System
**Spacing Units**: Use Tailwind units of **4, 6, 8, 12, 16** consistently throughout
- Component padding: p-6 or p-8
- Section spacing: gap-8 or gap-12
- Form field spacing: space-y-6
- Button padding: px-6 py-3

**Container Strategy**:
- Main application: max-w-7xl mx-auto px-6
- Form sections: max-w-3xl for optimal readability
- Data tables: Full width within container

## Component Library

### Navigation & Progress
**Top Header Bar**:
- Fixed position, subtle shadow, h-16
- Logo/app name (left), current step indicator (center), help/user menu (right)
- Step progress bar showing: Form Input → Dictionary → Schema → Preview → Generate

**Step Indicator**:
- Horizontal stepper with numbered circles
- Completed steps: filled with checkmark
- Current step: outlined, pulsing border
- Future steps: outline only, muted

### Form Components
**Input Fields**:
- Full-width within form sections
- Label above input (not floating)
- Generous height (h-12) for easy interaction
- Border with focus ring animation
- Helper text below in smaller font
- Error states with red border + icon + message

**Multi-Step Form Layout**:
- Single column, max-w-3xl centered
- One section visible at a time
- "Back" and "Next" buttons fixed at bottom (sticky)
- Auto-save indicator in top right

### Data Dictionary Editor
**Table Interface**:
- Striped rows for readability
- Inline editing: click to edit cells
- Action column (right): Edit, Delete icons
- "+ Add Entry" button above table
- Search/filter bar if entries > 10
- Column headers: sortable with arrow indicators

**Add/Edit Modal**:
- Centered overlay with backdrop blur
- Form fields for key-value pairs
- XSD type dropdown
- "Cancel" and "Save" buttons bottom right

### XSD Schema Section
**File Upload Zone**:
- Large dashed border box (min-h-48)
- Drag-and-drop area with icon and text
- "Browse Files" button centered
- Uploaded file displays with: filename, size, remove icon
- Validation messages below (green checkmark or red error)

### Document Preview
**Preview Panel**:
- Two-column layout on desktop: form summary (left), preview (right)
- Form summary: all entered data in organized sections
- Preview: simulated document view with scroll
- Sticky "Generate Document" button at top right

### Buttons
**Primary Action** (Generate, Next, Save):
- Solid background, white text, px-8 py-3
- Hover: slight scale (1.02), subtle shadow
- Disabled: reduced opacity, no interaction

**Secondary Action** (Back, Cancel):
- Outline style, px-6 py-3
- Hover: background fill

**Destructive Action** (Delete):
- Outline in red, hover fills with red

### Status & Feedback
**Success State**:
- Green checkmark icon + message
- Fade in animation

**Loading State**:
- Spinner with "Processing..." text
- Disable all interactive elements

**Error State**:
- Red alert icon + descriptive message
- Shake animation on appearance

## Animations
Use sparingly for feedback only:
- Step transitions: 200ms slide fade
- Modal appear: 150ms scale + fade
- Form validation: 100ms shake on error
- Success checkmark: 300ms scale bounce
- NO scroll animations, NO page transitions beyond basic fades

## Images
**No hero image needed** - this is a utility application focused on workflow efficiency. The interface should open directly to the first step of the form process.

**Icons**: Use Heroicons (outline style) via CDN for:
- Document icon (document generation)
- Table/grid icon (data dictionary)
- Upload cloud icon (XSD upload)
- Eye icon (preview)
- Check/X icons (validation)
- Navigation arrows (next/back)

## Accessibility
- All form inputs have visible labels (no placeholder-only)
- Focus states visible on all interactive elements
- Error messages programmatically associated with fields
- Keyboard navigation through entire workflow
- Skip navigation link for multi-step process
- ARIA labels on icon-only buttons