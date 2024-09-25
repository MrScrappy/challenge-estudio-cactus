import React, { useState } from 'react';
import Image from 'next/image';

interface Material {
  id: string;
  name: string;
  layers: { [key: string]: string };
  points: string[];
  materialPreview: string;
  pointId: string;
}

interface MaterialListProps {
  pointId: string;
  pointName: string;
  onClose: () => void;
  selectLayer: React.Dispatch<React.SetStateAction<string>>;
  ActiveLayer: React.Dispatch<React.SetStateAction<boolean>>;
  materials: Material[];
}

const MaterialList: React.FC<MaterialListProps> = ({ materials, selectLayer, ActiveLayer }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(materials.length > 0 ? materials[0] : null);

  const handleMaterialClick = (material: Material) => {
    setSelectedMaterial(material);
    ActiveLayer(true);
    const selectedLayerUrl = material.layers[material.points[0]];
    selectLayer(selectedLayerUrl);
  };

  return (
    <div className="material-list">
      <div className="material-content">
        {materials.map((material) => (
          <div
            className={` ${selectedMaterial?.id === material.id ? 'material-object' : 'material-object-no-selected'}`}
            key={material.id}
            onClick={() => handleMaterialClick(material)}
          >
            {selectedMaterial?.id === material.id && (
              <p className="material-name-p">{material.name}</p>
            )}
            <div className="image-border">
              <Image
                className="fixed-size-image"
                src={material.materialPreview}
                alt={material.name}
                width={selectedMaterial?.id === material.id ? 200 : 150}
                height={selectedMaterial?.id === material.id ? 200 : 150}
              />
            </div>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default MaterialList;