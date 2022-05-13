const ProjectSummary = ({project}) => {
    return ( 
        <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{project.title}</span>
                    <p>Posted by Ayush Shah</p>
                    <p className="gery-text">1st May,2022</p>
                </div>
        </div>
    );
}

export default ProjectSummary;