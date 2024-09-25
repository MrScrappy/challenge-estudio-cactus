"use client";

import { useEffect, useState, Fragment } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Point from './Point';
import MaterialList from './MaterialList';
import Image from 'next/image';

const RoomConfigurator = () => {
  interface PointData {
    id: string;
    coordinates: { coordX: number; coordY: number };
    name: string;
  }

  function myImageLoader() {
    return "https://firebasestorage.googleapis.com/v0/b/visualizer-new-devs-test.appspot.com/o/base.jpeg?alt=media&token=358ccdea-3cf9-4751-ae48-4631e4700554";
  }
  function imageLayer() {
    return layer;
  }

  interface MaterialData {
    id: string;
    name: string;
    layers: { [key: string]: string };
    points: string[];
    materialPreview: string;
    pointId: string;

  }

  

  const [points, setPoints] = useState<PointData[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);
  const [materials, setMaterials] = useState<MaterialData[]>([]);
  const [pointsVisible, setPointsVisible] = useState(true);
  const [layer, selectLayer] = useState("");
  const [activelayer, ActiveLayer] = useState(false);


  


  useEffect(() => {
    const fetchPoints = async () => {
      const pointsSnapshot = await getDocs(collection(db, 'points'));
      const pointsData = pointsSnapshot.docs.map((doc) => ({
        id: doc.id,
        coordinates: { coordX: doc.data().coordX, coordY: doc.data().coordY },
        ...doc.data(),
      })) as PointData[];
      setPoints(pointsData);
    };

    fetchPoints();
  }, []);

  useEffect(() => {
    if (selectedPoint) {
      const fetchMaterials = async () => {
        const materialsQuery = query(
          collection(db, 'materials'),
          where('points', 'array-contains', selectedPoint.id)
        );
        const materialsSnapshot = await getDocs(materialsQuery);
        const materialsData = materialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as MaterialData[];
        setMaterials(materialsData);
      };
      fetchMaterials();
    }
  }, [selectedPoint]);

  const handleClickOutside = (event: MouseEvent) => {
    if (selectedPoint && !(event.target as HTMLElement).closest('.material-list')) {
      setSelectedPoint(null);
      setPointsVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedPoint]);

  return (
    <div>
      {
        activelayer && (
          <Image
        src={imageLayer()}
        alt="Layer"
        fill={true}
        className="point-image-layer"
        objectPosition="center"
      />
        )
      }
      <Image
        src={myImageLoader()}
        alt="Room"
        fill={true}
        className="point-image"
        objectPosition="center"
      />
      {pointsVisible && points.map((point, index) => (
        point.coordinates ? (
          <Point
            key={index}
            name={point.name}
            coordinates={point.coordinates}
            onClick={() => {
              setSelectedPoint(point);
              setPointsVisible(false);
            }}
          />
        ) : null
      ))}
      <div>
        {selectedPoint && (
          <div className="materials" style={{  position: 'fixed', top: 0, right: 100, zIndex: 1000 }}>
            <MaterialList
              pointId={selectedPoint.id}
              pointName={selectedPoint.name}
              onClose={() => {
                setSelectedPoint(null);
                setPointsVisible(true);
              }}
              selectLayer={selectLayer}
              ActiveLayer={ActiveLayer}
              materials={materials}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomConfigurator;