# Team Photos Directory

This directory contains profile photos for team members.

## Photo Guidelines

### File Naming
- Use the team member's ID as the filename
- Examples: `priya-sharma.jpg`, `alex-rodriguez.jpg`, `sophia-chen.jpg`

### Photo Requirements
- **Format**: JPG, PNG, or WebP
- **Size**: 400x400px minimum (square format)
- **Quality**: High resolution for crisp display
- **Background**: Professional or clean background preferred

### Adding Photos
1. Add your photo files to this directory
2. Update the team member's data in `src/data/team.ts`
3. Add the `photo` field with the path: `/images/team/filename.jpg`

### Example
```typescript
{
  id: 'john-doe',
  name: 'John Doe',
  title: 'Software Engineer',
  role: 'tech',
  avatar: 'JD', // Fallback initials
  photo: '/images/team/john-doe.jpg', // Photo path
  // ... other fields
}
```

### Fallback
If a photo fails to load or isn't provided, the system will automatically fall back to displaying the initials from the `avatar` field. 