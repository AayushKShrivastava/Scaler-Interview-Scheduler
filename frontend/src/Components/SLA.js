import React from 'react'
import '../css/SLA.css'
import { useNavigate } from 'react-router-dom'

function SLA({toggle}) {

    const navigate = useNavigate()

  return (
    <div className="sla">
        <div className='close-btn' onClick={() => navigate('/')}>
          <>&#10006;</>
        </div>
        <h4 className='sla-head'>Interview Scheduler Service Level Agreement (SLA)</h4>
        <p>During the Term of the agreement Interview Scheduler Platform will be provided 
            to Customer (as applicable, the "Agreement"), the Covered Service will provide 
            a Monthly Uptime Percentage to Customer as follows (the "Service Level Objective" or "SLO"):
        </p>
        <table class="sla-table">
            <thead>
            <tr>
                <th><strong>Covered Service</strong></th>
                <th><strong>Monthly Uptime Percentage</strong></th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Meeting Scheduler</td>
                <td>&gt;= 99.95%</td>
            </tr>
            </tbody>
        </table>

        <p>If Interview Scheduler does not meet the SLO, and if Customer meets its obligations 
            under this SLA, Customer will be eligible to receive the Financial Credits described 
            below. Monthly Uptime Percentage and Financial Credit are determined on a calendar month 
            basis per user. This SLA states Customer's sole and exclusive remedy for any failure by 
            Interview Scheduler to meet the SLO.
        </p>

        <h4 className='sla-subheadings'>Definitions</h4>

        <p>The following definitions apply to the SLA:</p>

        <ul className='sla-'>
            <li>
                <p><strong>"Covered Service"</strong>&nbsp;means display scheduled meetings, Schedule, Update, and Cancel meetings.
                </p>
            </li>
            <li>
                <p><strong>"Downtime"</strong>&nbsp;means more than a ten
                percent Error Rate.</p>
            </li>
            <li>
                <p><strong>"Downtime Period"</strong>&nbsp;means a period of
                one or more consecutive minutes of Downtime. Partial minutes
                or intermittent Downtime for a period of less than one
                minute will not be counted towards any Downtime Periods.</p>
            </li>
            <li>
                <p><strong>"Error Rate"</strong>&nbsp;for the Covered Service
                is defined as the number of errors divided by the total
                number of attempted function executions, subject to a
                minimum of 100 attempted executions in the measurement
                period. An error is defined as a result
                of&nbsp;SYSTEM_ERROR&nbsp;in response to a valid invocation
                event.</p>
            </li>
            <li>
                <p><strong>"Financial Credit"</strong>&nbsp;means the
                following:</p>
                <table class="sla-table">
                  <tbody>
                    <tr>
                      <td><strong>Monthly Uptime Percentage</strong></td>
                      <td><strong>Percentage of monthly bill for the respective
                          Covered Service that does not meet SLO that will be
                          credited to Customer's future monthly bills</strong>
                      </td>
                    </tr>
                    <tr>
                      <td>99% to &lt; 99.95%</td>
                      <td>10%</td>
                    </tr>
                    <tr>
                      <td>95% to &lt; 99%</td>
                      <td>25%</td>
                    </tr>
                    <tr>
                      <td>&lt; 95%</td>
                      <td>50%</td>
                    </tr>
                  </tbody>
                </table>
            </li>
            <li>
                <p><strong>"Monthly Uptime Percentage"</strong>&nbsp;means total number of minutes in a month, 
                    minus the number of minutes of Downtime suffered from all Downtime Periods in a month, divided 
                    by the total number of minutes in a month.
                </p>
            </li>
        </ul>

        <h4 className='sla-subheadings'>Customer Must Request Financial Credit</h4>

        <p>In order to receive any of the Financial Credits described
            above, Customer
            must notify meeting scheduler team within
            30 days from the time Customer becomes eligible to receive a
            Financial Credit. Customer must also provide log
            files showing Downtime Periods and the date and time they
            occurred. If Customer does not comply with these requirements,
            Customer will forfeit its right to receive a Financial Credit.
            If a dispute arises with respect to this SLA, Meeting Scheduler will make a
            determination in good faith based on its system logs, monitoring
            reports, configuration records, and other available information.
        </p>
    </div>
  )
}

export default SLA