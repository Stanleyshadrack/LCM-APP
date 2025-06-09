"use client";

import { useTheme } from "@/app/context/ThemeContext";
import { Switch } from "antd";


export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-switch">
      <span>{theme === "dark" ? "Dark Mode" : "Light Mode"}</span>
      <Switch
        checked={theme === "dark"}
        onChange={toggleTheme}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </div>
  );
}
