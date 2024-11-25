"use client";

import { useState, useRef } from "react";
import { useDesignStore } from "../../stores/designStore";
import { XMarkIcon, PhotoIcon, ViewColumnsIcon } from "@heroicons/react/24/outline";
import { compressImage } from "../../utils/imageCompression";

export default function DesignUpload() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'single' | 'carousel' | null>(null);
  const [design, setDesign] = useState({
    title: "",
    status: "Draft" as const,
    date: new Date().toISOString().split('T')[0],
    type: 'single' as 'single' | 'carousel',
    images: [] as string[],
  });
  const [error, setError] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const addDesign = useDesignStore((state) => state.addDesign);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Check file size limit (5MB per file)
    const oversizedFiles = files.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      setError("Each file should be less than 5MB");
      return;
    }

    try {
      const newPreviews: string[] = [];
      
      for (const file of files) {
        const reader = new FileReader();
        const base64String = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        
        // Compress the image
        const compressedImage = await compressImage(base64String);
        newPreviews.push(compressedImage);
      }

      setPreviews(newPreviews);
      setDesign(prev => ({
        ...prev,
        type: files.length > 1 ? 'carousel' : 'single',
        images: newPreviews
      }));
    } catch (error) {
      setError("Error processing images. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (previews.length === 0) {
      setError("Please upload at least one image");
      return;
    }

    const autoTitle = `Design ${new Date().toLocaleDateString()}`;
    
    addDesign({
      ...design,
      title: autoTitle,
      id: crypto.randomUUID(),
      imageUrl: design.type === 'single' ? previews[0] : undefined,
      images: design.type === 'carousel' ? previews : [],
      createdAt: new Date().toISOString()
    });

    // Reset form
    setDesign({
      title: "",
      status: "Draft",
      date: new Date().toISOString().split('T')[0],
      type: 'single',
      images: [],
    });
    setPreviews([]);
    setIsOpen(false);
    setUploadType(null);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Upload Design
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Design</h2>
              <button onClick={() => setIsOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {!uploadType ? (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUploadType('single')}
                  className="p-6 border-2 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <PhotoIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                  <span className="block text-sm font-medium">Single Image</span>
                </button>
                <button
                  onClick={() => setUploadType('carousel')}
                  className="p-6 border-2 border-dashed rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                >
                  <ViewColumnsIcon className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                  <span className="block text-sm font-medium">Image Carousel</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Upload Image{uploadType === 'carousel' ? 's' : ''}</label>
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer"
                    >
                      {previews.length > 0 ? (
                        <div className="grid grid-cols-2 gap-2">
                          {previews.map((preview, index) => (
                            <img
                              key={index}
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          <PhotoIcon className="w-8 h-8 mx-auto mb-2" />
                          <p>Click to upload</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple={uploadType === 'carousel'}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {error && <p className="text-red-500 text-sm">{error}</p>}

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setUploadType(null);
                        setPreviews([]);
                      }}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 