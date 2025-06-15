// Profile data management

// Initial profile data
let profileData = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "A passionate web developer with a keen eye for design and a love for creating seamless user experiences.",
  image: "/assets/profile/IMG-20240913-WA0023.jpg",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  social: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe",
  },
};

// Load profile data from localStorage if available
if (typeof window !== "undefined") {
  const savedProfile = localStorage.getItem("portfolio_profile");
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
    localStorage.setItem("portfolio_profile", JSON.stringify(profileData));
  }

  return { ...profileData };
}

// Update profile image
export function updateProfileImage(imagePath) {
  profileData.image = imagePath;

  // Save to localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("portfolio_profile", JSON.stringify(profileData));
  }

  return { ...profileData };
}
