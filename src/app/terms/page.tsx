"use client";

import { Suspense } from "react";
import TermsPage from "./terms";
import { Spin } from "antd";
import { FastBackwardOutlined } from "@ant-design/icons";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin
            size="large"
            indicator={<FastBackwardOutlined style={{ fontSize: 32 }} spin />}
            tip="Loading..."
          />
        </div>
      }
    >
      <TermsPage />
    </Suspense>
  );
}
