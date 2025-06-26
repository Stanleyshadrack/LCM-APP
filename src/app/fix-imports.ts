import { Project } from "ts-morph";
import path from "path";

const project = new Project();
project.addSourceFilesAtPaths("src/**/*.ts");
project.addSourceFilesAtPaths("src/**/*.tsx");

const replacements = [
  {
    from: "./lcmapplication/protected/sidebar/sidebar",
    to: "@/components/layout/sidebar",
  },
  {
    from: "./lcmapplication/protected/topbar/topbars",
    to: "@/components/layout/topbar",
  },
  {
    from: "./forms/add-tenants/add-tenant",
    to: "@/features/tenants/create-tenant-form",
  },
  {
    from: "./drawer/addMeterReadingDrawer",
    to: "@/features/meterReadings/components/add-meter-reading-drawer",
  },
];

const files = project.getSourceFiles();

files.forEach((file) => {
  const imports = file.getImportDeclarations();
  imports.forEach((importDecl) => {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();
    replacements.forEach(({ from, to }) => {
      if (moduleSpecifier.includes(from)) {
        importDecl.setModuleSpecifier(moduleSpecifier.replace(from, to));
      }
    });
  });
});

project.save().then(() => {
  console.log("✅ All imports updated.");
});