import React, { useState } from "react";
import styles from "./LatestAdd.module.css";
import Image from "next/image";

const LatestAdd: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [trackerFile, setTrackerFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInputFile(event.target.files[0]);
    }
  };

  const handleTrackerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setTrackerFile(event.target.files[0]);
    }
  };

  const removeInputFile = () => setInputFile(null);
  const removeTrackerFile = () => setTrackerFile(null);

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
    if (!inputFile || !trackerFile) {
      setError("Please upload both input and tracker files.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("input_file", inputFile);
    formData.append("tracker_file", trackerFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/process_latest`, {
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
      link.setAttribute("download", "updated_latest_tracker.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error);
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.latestAdd}>
      <div className={styles.modalContent}>
        <h2>Upload Latest Files</h2>

        {/* Error Message */}
        {error && (
          <div className={styles.errorBox}>
            <p>{error}</p>
            <button onClick={() => setError(null)} className={styles.dismissButton}>×</button>
          </div>
        )}

        {/* Input File Upload */}
        <div className={styles.uploadSection}>
          <label className={styles.uploadLabel}>
            Select Input File
            <input type="file" onChange={handleInputUpload} className={styles.hiddenInput} />
          </label>
        </div>

        {/* Display Input File */}
        {inputFile && (
          <div className={styles.trackerFile}>
            <div className={styles.fileInfo}>
              <Image src={getFileIcon(inputFile.name)} alt="File icon" width={24} height={24} className={styles.fileIcon} />
              <span className={styles.fileName}>{inputFile.name}</span>
            </div>
            <button className={styles.removeButton} onClick={removeInputFile}>✕</button>
          </div>
        )}

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

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.uploadButton}
            onClick={handleProcess}
            disabled={loading || !inputFile || !trackerFile}
          >
            {loading ? "Processing..." : "Process"}
          </button>
          <button className={styles.cancelButton} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LatestAdd;
