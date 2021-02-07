//job class:represents a job
class Job
{
    constructor(company,link,status,notes)
    {
        this.company=company;
        this.link=link;
        this.status=status;
        this.notes=notes;
        this.jobID=jobID;
    }
}

//user class: handles user interface tasks

class UI{
    static displayJobs(){
        // const StoredJobs=[
        //     {
        //         company:'Modelon',
        //         status:'shortlisted',
        //         notes:'Got a call from HR,Interview scheduled on Monday'
        //     }
        // ];

        // const jobs=StoredJobs;

        const jobs=Store.getJobs();

        jobs.forEach((job)=>UI.addJobToList(job));
    }


    static addJobToList(job)
    {
        const list=document.querySelector('#job-list');
        const row=document.createElement('tr');
        row.innerHTML=
        `<td>${job.company}</td>
        <td>${job.link}</td>
        <td>${job.status}</td>
        <td>${job.notes}</td>
        <td>${job.jobID}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>`;

        list.appendChild(row);

    }

    static deleteJob(el)
    {
        //confirming if target element is the one that should be deleted
        if(el.classList.contains('delete'))
        {
            el.parentElement.parentElement.remove();
        }
    }
    static clearFields()
    {
        document.querySelector('#company').value='';
        document.querySelector('#link').value='';
        document.querySelector('#status').value='';
        document.querySelector('#notes').value='';
        document.querySelector('#jobID').value='';

    }

}

//store class:takes care of storage

class Store{


    static getJobs()
    {
      let jobs;
      if(localStorage.getItem('jobs')===null)
      {
          jobs=[];
      }
      else{
          jobs=JSON.parse(localStorage.getItem('jobs'));
      }
      return jobs;
    }


    static addJob(job)
    {
     const jobs=Store.getJobs();
     jobs.push(job);
     localStorage.setItem('jobs',JSON.stringify(jobs));
    }


    static removeJob(jobID)
    {
          const jobs=Store.getJobs();
          jobs.ForEach((job,index)=>{
                if(job.jobID===jobID)
                {
                    jobs.splice(index,1);
                }
          });


          localStorage.setItem('jobs',JSON.stringify(jobs));
    }
   
}




//event:display jobs

document.addEventListener('DOMContentLoaded',UI.displayJobs);


//event:add a job

document.querySelector('#job-form').addEventListener('submit',(e)=>
{
    //prevent actual submit
    e.preventDefault();
    
    
    //get values
    const company=document.querySelector('#company').value;
    const link=document.querySelector('#link').value;
    const status=document.querySelector('#status').value;
    const notes=document.querySelector('#notes').value;
    const jobID=document.querySelector('#jobID').value;
    
    //validate the entry
    if(company===''||status===''||jobID==='')
    {
        alert("Please fill in all the fields!")
    }
    else
    {
        //instantiating job 
    const job=new Job(company,link,status,notes,jobID);

    //add job to UI
     UI.addJobToList(job);

     //add job in local storage
     Store.addJob(job);


     //clear fields after submitting
     UI.clearFields();
    }
    

    });

//event:remove job
document.querySelector('#job-list').addEventListener('click',(e)=>{
    //remove job from UI
    UI.deleteJob(e.target);
    
    //remove job from storage
    Store.removeJob(e.target.parentElement.previousElementSibling.textContent);
    
});





