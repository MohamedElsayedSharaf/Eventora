// src/pages/user/UserSettings.jsx
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Ui/Input';
import Button from '../../components/Ui/Button';

const UserSettings = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      // Show success message
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Account Settings
      </h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="space-y-4">
          <Input
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;