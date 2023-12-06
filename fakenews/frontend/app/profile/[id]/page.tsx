'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { User } from '@/types/types';
import { formatDateTime } from '@/lib/convertTime';
import { useRouter } from 'next/navigation';

const Profile = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // id: aktuális dinamikus útvonal paraméter

  const [profileData, setProfileData] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:8000/profile/${id}`, { withCredentials: true })
        .then((res) => {
          setProfileData(res.data);
        })
        .catch((error) => {
          if (error.response) {
            // Server válasz hiba
            toast.error(error.response.data.message || 'Hiba történt');
          } else if (error.request) {
            // Nincs válasz a szerverről
            toast.error('Nem sikerült kapcsolódni a szerverhez');
          } else {
            // Egyéb hiba
            toast.error(error.message || 'Ismeretlen hiba történt');
          }
        });
    }
  }, [id]);

  return (
    <div>
      <h1>Profil oldal</h1>
      {profileData ? (
        <div>
          <p>ID: {id}</p>
          {/* Profiladatok megjelenítése */}
          <p>Nev: {profileData.name} </p>
          <p>Email: {profileData.email}</p>
          <p>Letrehozas datuma: {formatDateTime(profileData.createdAt)}</p>
        </div>
      ) : (
        <p>Betöltés...</p>
      )}
    </div>
  );
};

export default Profile;
