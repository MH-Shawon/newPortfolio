// Profile data management

// Initial profile data
let profileData = {
  name: "Md. Mohsin Hossain",
  title: "Full Stack Developer",
  bio: "A passionate web developer with a keen eye for design and a love for creating seamless user experiences.",
  image: "/assets/profile/IMG-20240913-WA0023.jpg",
  email: "mohsinshawon18@gmail.com",
  phone: "+8801635017181",
  location: "Cumilla, Chittagong,Bangladesh",
  social: {
    github: "https://github.com/MH-Shawon",
    linkedin: "https://linkedin.com/in/md-mohsin-hossain-324b9b1b7",
    twitter: "https://x.com/MhShawo50365332",
  },
};

// Load profile data from localStorage if available
if (typeof window !== "undefined") {
  const savedProfile = localStorage.getItem("portfolio_profile_v2");
  if (savedProfile) {
    try {
      profileData = JSON.parse(savedProfile);
    } catch (error) {
      // Keep the existing profileData
    }
  }
}

// Get profile data
export function getProfile() {
  return { ...profileData };
}

// Update profile data
export function updateProfile(newProfileData) {
  profileData = { ...profileData, ...newProfileData };

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_profile_v2", JSON.stringify(profileData));
  }

  return { ...profileData };
}

// Update profile image
export function updateProfileImage(imagePath) {
  profileData.image = imagePath;

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_profile_v2", JSON.stringify(profileData));
  }

  return { ...profileData };
}
