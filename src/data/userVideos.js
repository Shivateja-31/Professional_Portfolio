// ==============================================================================
// USER VIDEO CONFIGURATION
// ==============================================================================
// HOW TO ADD YOUR OWN VIDEOS:
// 1. Copy your video files (.mp4 / .mov / .webm) into the "public/" folder:
//    Example: "public/my_reel_1.mp4"
// 2. Set the "video" path below to "/my_reel_1.mp4"
// 3. (Optional) Add a thumbnail image into "public/" and set "poster: '/my_thumb.jpg'"
// 4. Update the title, category, views, and duration to match your project!
// ==============================================================================

export const INITIAL_SHORT_FORM_WORKS = [
  {
    id: 'sf-1',
    title: 'Caption Editing // Viral Cut',
    category: 'Talking Head / Reel',
    views: '1.4M+',
    duration: '00:30',
    poster: '/work_media/cap.jpeg',
    video: '/CaptionEditing.mp4',
    tags: ['Royal Color Grade', 'Speed Ramp', 'Sound Design']
  },
  {
    id: 'sf-2',
    title: 'Diet Coke // Commercial Hook',
    category: 'Commercial Ad / Hook',
    views: '2.1M+',
    duration: '00:25',
    poster: '/work_media/diet.jpeg',
    video: '/dietcoke.mp4',
    tags: ['Kinetic Motion', 'Hook Visuals', 'Retention Cut']
  },
  {
    id: 'sf-3',
    title: 'UGC Brand Ad // Viral Hook',
    category: 'UGC Commercial Ad',
    views: '1.2M+',
    duration: '00:10',
    poster: '/work_media/ugc_thumb.jpg',
    video: '/UGC AD.mp4',
    tags: ['UGC Creator', 'Hook Visuals', 'Commercial Pacing']
  },
  {
    id: 'sf-4',
    title: 'Marketing // High Conversion Hook',
    category: 'Commercial Ad / Hook',
    views: '1.8M+',
    duration: '00:30',
    poster: '/work_media/marketing_thumb.jpg',
    video: '/Marketing.mp4',
    tags: ['Motion Graphics', 'Retention Cut', 'Visual Flow']
  }
];

export const INITIAL_LONG_FORM_WORKS = [
  {
    id: 'lf-1',
    title: 'Student Life // Motion Graphics',
    category: 'Motion Graphic Narrative',
    runtime: '04:15',
    aspect: '16:9 Widescreen',
    poster: '/work_media/student_thumb.jpg',
    video: '/student.mp4',
    desc: 'Dynamic motion graphics cut, kinetic typography, and seamless visual storytelling.'
  },
];