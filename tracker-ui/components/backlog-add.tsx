import React, { useState } from "react";
import styles from "./BacklogAdd.module.css";
import Image from "next/image";

const BacklogAdd: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [trackerFile, setTrackerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles([...files, ...Array.from(event.target.files)]);
    }
  };

  const handleTrackerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setTrackerFile(event.target.files[0]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const removeTrackerFile = () => {
    setTrackerFile(null);
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith(".xls") || fileName.endsWith(".xlsx")) {
      return "/icons/icon-excel.png";
    }
    return "/icons/file-icon.png";
  };

  const getFriendlyErrorMessage = (status: number): string => {
    switch (status) {
      case 400:
        return "Invalid request. Please check your input files.";
      case 404:
        return "Processing service not found. Please try again later.";
      case 500:
        return "Server error. Try again in a few minutes.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  const handleProcess = async () => {
    if (files.length === 0 || !trackerFile) {
      setError("Please upload both input and tracker files.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();

    files.forEach((file) => formData.append("input_files", file));
    formData.append("tracker_file", trackerFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/process_backlog`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const friendlyMessage = getFriendlyErrorMessage(response.status);
        throw new Error(friendlyMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "processed_tracker.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (error instanceof Error) {
        console.error("Processing error:", error);
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.backlogAdd}>
      <div className={styles.modalContent}>
        <h2>Upload Backlog Files</h2>

        {/* Error Message */}
        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
            <button onClick={() => setError(null)} className={styles.dismissButton}>×</button>
          </div>
        )}

        {/* Input Files */}
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            Select Input Files
            <input type="file" multiple onChange={handleFileUpload} className={styles.hiddenInput} />
          </label>
        </div>

        {/* Selected Input Files List */}
        <div className={styles.fileList}>
          <h3>Selected Files:</h3>
          <ul className={styles.fileGrid}>
            {files.map((file, index) => (
              <li key={index} className={styles.fileItem}>
                <div className={styles.fileInfo}>
                  <Image src={getFileIcon(file.name)} alt="File icon" width={24} height={24} className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                </div>
                <button className={styles.removeButton} onClick={() => removeFile(index)}>✕</button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tracker File Upload */}
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            Select Tracker File
            <input type="file" onChange={handleTrackerUpload} className={styles.hiddenInput} />
          </label>
        </div>

        {/* Display Tracker File */}
        {trackerFile && (
          <div className={styles.trackerFile}>
            <div className={styles.fileInfo}>
              <Image src={getFileIcon(trackerFile.name)} alt="File icon" width={24} height={24} className={styles.fileIcon} />
              <span className={styles.fileName}>{trackerFile.name}</span>
            </div>
            <button className={styles.removeButton} onClick={removeTrackerFile}>✕</button>
          </div>
        )}

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <button 
            className={styles.uploadButton} 
            onClick={handleProcess} 
            disabled={loading || files.length === 0 || !trackerFile}
          >
            {loading ? "Processing..." : "Process"}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BacklogAdd;
