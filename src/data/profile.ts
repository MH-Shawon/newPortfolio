// Profile data management

interface Profile {
  name: string;
  title: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

// Initial profile data
let profileData: Profile = {
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

// Get profile data
export function getProfile(): Profile {
  return { ...profileData };
}

// Update profile data
export function updateProfile(newProfileData: Partial<Profile>): Profile {
  profileData = {
    ...profileData,
    ...newProfileData,
  };
  return { ...profileData };
}

// Update profile image
export function updateProfileImage(imagePath: string): Profile {
  profileData.image = imagePath;
  return { ...profileData };
}
