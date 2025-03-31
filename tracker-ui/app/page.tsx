"use client";

import { FunctionComponent, useState, useCallback } from "react";
import LatestAdd from "@/components/latest-add";
import PortalPopup from "@/components/portal-popup";
import BacklogAdd from "@/components/backlog-add";
import styles from "../styles/MainScreen.module.css";

const MainScreen: FunctionComponent = () => {
  const [isLatestAddOpen, setLatestAddOpen] = useState(false);
  const [isBacklogAddOpen, setBacklogAddOpen] = useState(false);

  const openLatestAdd = useCallback(() => setLatestAddOpen(true), []);
  const closeLatestAdd = useCallback(() => setLatestAddOpen(false), []);

  const openBacklogAdd = useCallback(() => setBacklogAddOpen(true), []);
  const closeBacklogAdd = useCallback(() => setBacklogAddOpen(false), []);

  return (
    <>
      <div className={styles.container}>
        {/* Header */}
        <h1 className={styles.header}>Fire and Gas Tracker Bot</h1>

        <div className={styles.mainScreen}>
          {/* Latest Section */}
          <div className={styles.menu} onClick={openLatestAdd}>
            <div className={styles.menuHeader}>Latest</div>
            <div className={styles.menuSeparator}>
              <div className={styles.rule} />
            </div>
            <div className={styles.menuSection}>
              <ul className={styles.instructions}>
                <li>Accepts only <b>one</b> input file.</li>
                <li>File must be in <b>Excel format (.xlsx)</b>.</li>
                <li>A <b>tracker file</b> must be uploaded along with the input file.</li>
                <li>Processes the files immediately upon upload.</li>
                <li>Generates and provides a processed file for download.</li>
              </ul>
            </div>
          </div>

          {/* Backlog Section */}
          <div className={styles.menu1} onClick={openBacklogAdd}>
            <div className={styles.menuHeader}>Backlog</div>
            <div className={styles.menuSeparator}>
              <div className={styles.rule} />
            </div>
            <div className={styles.menuSection}>
              <ul className={styles.instructions}>
                <li>Allows <b>multiple</b> input files to be uploaded at once.</li>
                <li>All files must be in <b>Excel format (.xlsx)</b>.</li>
                <li>Requires an additional <b>tracker file</b> for processing.</li>
                <li>Processes all files together as a batch.</li>
                <li>Once complete, provides a processed file for download.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popup Components */}
        {isLatestAddOpen && (
          <PortalPopup overlayColor="rgba(0, 0, 0, 0.5)" placement="Centered" onOutsideClick={closeLatestAdd}>
            <LatestAdd onClose={closeLatestAdd} />
          </PortalPopup>
        )}
        {isBacklogAddOpen && (
          <PortalPopup overlayColor="rgba(0, 0, 0, 0.5)" placement="Centered" onOutsideClick={closeBacklogAdd}>
            <BacklogAdd onClose={closeBacklogAdd} />
          </PortalPopup>
        )}
      </div>
    </>
  );
};

export default MainScreen;
