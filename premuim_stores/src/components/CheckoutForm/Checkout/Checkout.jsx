import React, { useState } from 'react'
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@material-ui/core'

const steps = ['Shipping address', 'Payment details']

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4'>Checkout</Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <step key={step}>
                <StepLabel>{step}</StepLabel>
              </step>
            ))}
          </Stepper>
        </Paper>
      </main>
    </>
  )
}

export default Checkout
