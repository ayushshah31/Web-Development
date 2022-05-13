import React from 'react'
import { useParams } from 'react-router-dom'

export default function ProjectDetails() {
    const id = useParams();
    console.log(id.id);
  return (
    <div className='container session project-details'>
        <div className="card z-depth-0">
            <div className="card-content">
                <span className="card-title">Project Title - {id.id} </span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eligendi minima doloremque molestias, iure illo, beatae deleniti porro dolores voluptate a perferendis, incidunt exercitationem molestiae architecto. Aspernatur, ab error? Minima?</p>
            </div>
            <div className="card-action grey lighten-4 grey-text">
                <div>Posted by Ayush Shah</div>
                <div>1st May,2022</div>
            </div>
        </div>
    </div>
  )
}
