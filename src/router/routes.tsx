import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "@/layouts/DefaultLayout";

import Home from "@/pages/Home";
import AddTransmissionLine from "@/pages/AddTransmissionLine/AddTransmissionLine";
import DragandDragExample from "@/pages/Canvas/Canvas";
import ScriptPage from "@/pages/OpenDssScript";
import GeneratePage from "@/pages/GenerateResults";
import TowerGeometries from "@/pages/TowerGeometries";
import Conductors from "@/pages/Conductors";
import EditTransmissionLine from "@/pages/EditTransmissionLine";
import EditSource from "@/pages/EditSource";
import PageNotFound from "@/pages/PageNotFound";
import AddSource from "@/pages/AddSource";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="drag" element={<DragandDragExample />} />
          <Route path="script" element={<ScriptPage />} />
          <Route path="generate" element={<GeneratePage />} />
          <Route path="towers" element={<TowerGeometries />} />
          <Route path="conductors" element={<Conductors />} />

          <Route
            path="transmissionLines/new"
            element={<AddTransmissionLine />}
          />
          <Route
            path="transmissionLines/:id"
            element={<EditTransmissionLine />}
          />
          <Route path="sources/new" element={<AddSource />} />
          <Route path="sources/:id" element={<EditSource />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
