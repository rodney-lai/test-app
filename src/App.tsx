/**
 *
 * Copyright (c) 2020 Rodney S.K. Lai
 * https://github.com/rodney-lai
 *
 * Permission to use, copy, modify, and/or distribute this software for
 * any purpose with or without fee is hereby granted, provided that the
 * above copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 */

import * as React from 'react'
import { useState, ChangeEvent } from 'react'
import './App.css'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Images from './components/Images'
import WebCam from './components/WebCam'
import About from './components/About'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
}));

const App = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0)

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  return (
    <Grid container className="App">
      <Grid container className={classes.root}>
        <Grid item xs={4} style={{backgroundColor:"#ccc",textAlign:"left"}}>
          <img src="https://img.rodneylai.com/logo.jpg" width="50px" style={{padding:"15px"}} alt="rodney" title="rodney" />
        </Grid>
        <Grid item xs={4} style={{backgroundColor:"#ccc"}}>
        </Grid>
        <Grid item xs={4} style={{backgroundColor:"#ccc"}}>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Home" />
              <Tab label="WebCam" />
              <Tab label="About" />
          </Tabs>
          </AppBar>
        </Grid>
        <Grid item xs={6} style={{padding:"15px",backgroundColor:"#e6e6e6",textAlign:"left"}} >
          <Typography variant="h4">
            Rodney's Test App
          </Typography>
        </Grid>
        <Grid item xs={6} style={{padding:"15px",backgroundColor:"#e6e6e6"}}>
        </Grid>
        <Grid item xs={12}>
          <Images show={value === 0} />
          <WebCam show={value === 1} />
          <About show={value === 2} />
        </Grid>
        <Grid item xs={12} style={{padding:"15px"}}>
          Copyright (c) 2020 Rodney S.K. Lai
        </Grid>
      </Grid>
    </Grid>
  );
}

export default App;
