import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';





import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});





export default function DataDisplay(props) {
  const history = useHistory()
  
  const classes = useStyles;
  const [blogs, setBlogs] = useState([])

  const [site, setSite] = useState('/')
  const [loading, setLoading] = useState(false)


  const fetchData = (sitee) => {
    console.log('fetching ' + sitee)
    setLoading(true)
    axios.get('http://127.0.0.1:5000' + sitee)
      .then((res) => {
        if (res.status === 200) {
          const blogs = res.data;
          setBlogs(blogs)
          setLoading(false)
        }
        else{
          setBlogs([])
          setLoading(false)
        }

      })
  }

  useEffect(() => {
    
    return history.listen((location => {
      console.log(`You changed the page to ${location.pathname}`)
      setSite(location.pathname)
      fetchData(location.pathname)
    }))
  }, [history])

  useEffect(() => {


    setSite(history.location.pathname)
    fetchData(history.location.pathname)
  }, [])

  const BlogSiteDisplay = () => {
    
    switch (site) {
      case '/':
        return (<h1>All</h1>)
      case '/the-matter':
        return (<h1>The Matter</h1>)
      case '/the-cloud':
        return (<h1>The Cloud</h1>)
      case '/thairath':
        return (<h1>Thairath</h1>)
      default:
        return (null)
    }
  }

  
  return (
    <div>
      
      <button onClick={() => (history.push("/the-matter"))}>The Matter</button>
      <button onClick={() => (history.push("/the-cloud"))}>The Cloud</button>
      <button onClick={() => (history.push("/thairath"))}>Thairath</button>
      <button onClick={() => (history.push("/"))}>All</button>
      <BlogSiteDisplay />
      {loading ? <LinearProgress /> : <h3>{blogs.length} articles</h3>}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow key={'1'}>
              <TableCell key={'2'}>Title</TableCell>
              <TableCell key={'3'}align="left">Categories</TableCell>
              <TableCell key={'4'}align="left">Date</TableCell>
              {site === '/' ? <TableCell key={'6'} align="left">Site</TableCell> : null}
              <TableCell key={'5'} align="left">Body</TableCell>



            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog,key) => (
              
              <TableRow key={key}>
                <TableCell key={blog['_id'] + key + 1} component="th" scope="blog"><a href={blog['url']} target="_blank" >
                  {blog['title']}
                 
                </a>
                </TableCell>
                {/* <TableCell align="left"><a href={blog['url']} target="_blank">
                  {blog['url']}
                  </a>
                </TableCell> */}
                <TableCell align="left" key={blog['_id'] + 2}>
                  {blog['category'].map((x,key) => <Chip label={x} key={key}></Chip>)}
                </TableCell>
                <TableCell align="left" key={blog['_id'] + 3}>
                  {blog['date']}
                </TableCell>
                {site === '/' ? <TableCell align="left" key={blog['_id']+4}>{blog['site']}</TableCell> : null}
                <TableCell align="left" key={blog['_id'] + 5}>
                  {blog['body']}
                </TableCell>




              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
