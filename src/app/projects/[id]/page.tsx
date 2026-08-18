import { ProjectDetails } from "@/app/components/ProjectDetails";
import Navbar from "@/app/components/Navbar";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectPage({
  params,
}: ProjectPageProps) {
  const { id } = await params;

  return (
    <>
      <Navbar />

      <main>
        <ProjectDetails projectId={id} />
      </main>
    </>
  );
}