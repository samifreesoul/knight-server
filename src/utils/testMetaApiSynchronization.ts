import MetaApi from "metaapi.cloud-sdk"
// let MetaApi = require("metaapi.cloud-sdk").default;

let token =
  process.env.TOKEN ||
  "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJiNDVhZGNkY2M0YjcyMzQ1YTEwYjM0ZmJiYjRlM2E4YyIsImFjY2Vzc1J1bGVzIjpbeyJpZCI6InRyYWRpbmctYWNjb3VudC1tYW5hZ2VtZW50LWFwaSIsIm1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjU3MTZiMTA3LTM1NTktNGUxNC05ZmYzLWNlM2NlNjFjYjgyMiJdfSx7ImlkIjoibWV0YWFwaS1yZXN0LWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6NTcxNmIxMDctMzU1OS00ZTE0LTlmZjMtY2UzY2U2MWNiODIyIl19LHsiaWQiOiJtZXRhYXBpLXJwYy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo1NzE2YjEwNy0zNTU5LTRlMTQtOWZmMy1jZTNjZTYxY2I4MjIiXX0seyJpZCI6Im1ldGFhcGktcmVhbC10aW1lLXN0cmVhbWluZy1hcGkiLCJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyJhY2NvdW50OiRVU0VSX0lEJDo1NzE2YjEwNy0zNTU5LTRlMTQtOWZmMy1jZTNjZTYxY2I4MjIiXX0seyJpZCI6Im1ldGFzdGF0cy1hcGkiLCJtZXRob2RzIjpbIm1ldGFzdGF0cy1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6NTcxNmIxMDctMzU1OS00ZTE0LTlmZjMtY2UzY2U2MWNiODIyIl19LHsiaWQiOiJyaXNrLW1hbmFnZW1lbnQtYXBpIiwibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjU3MTZiMTA3LTM1NTktNGUxNC05ZmYzLWNlM2NlNjFjYjgyMiJdfSx7ImlkIjoibWV0YWFwaS1yZWFsLXRpbWUtc3RyZWFtaW5nLWFwaSIsIm1ldGhvZHMiOlsibWV0YWFwaS1hcGk6d3M6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbImFjY291bnQ6JFVTRVJfSUQkOjU3MTZiMTA3LTM1NTktNGUxNC05ZmYzLWNlM2NlNjFjYjgyMiJdfSx7ImlkIjoiY29weWZhY3RvcnktYXBpIiwibWV0aG9kcyI6WyJjb3B5ZmFjdG9yeS1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiYWNjb3VudDokVVNFUl9JRCQ6NTcxNmIxMDctMzU1OS00ZTE0LTlmZjMtY2UzY2U2MWNiODIyIl19XSwiaWdub3JlUmF0ZUxpbWl0cyI6ZmFsc2UsInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiJiNDVhZGNkY2M0YjcyMzQ1YTEwYjM0ZmJiYjRlM2E4YyIsImlhdCI6MTc0NDQ1NTMzNCwiZXhwIjoxNzQ3MDQ3MzM0fQ.hW3lXA5zsu9nYiydA28xJpn67yxJECIowoi4droDbB1PGw6q-0woSnL-aPUWUqCFTH57TACkPGNT_lcagaDEH0mvLeI2uZrY3gc7xW28ixfCUlrYfvPDAUCeaLT0BxbwmnWwUtRt-NuIPO31jnnBmR3yo6gNUbKOCnEgxM7PSSW-BAnPKz8MuhlKZbJ0xOfbCPaivQI5YfF3PkC3FIC5OAusYMp986UeGdembE1alIgBrobp5iUl_GElKcQprudzLhBIGISiP9iUBLmlhwSFv4J39ZtUe4Q9-pJJxRoUVPEX_AZbPOaMlWO1bza_KIe-h8Ykmpvoytm0p3kYwf2qk2DDF9QMaz-X_PVdSQneM7IxLZYryj09vOqmzRMjowYcXzkP34u9_QQlYQxJgPQq4AcBC_RrKoIE8KovTYm9B2IWihPPGH_DmU2aWYBQUauiaWGhfgTu09mn6AoZDZJkA7gesjCymXIcMJJzFzoBKsY7yYG4SXMA9e03yV60oI47ulAQIztZXXyvCEbWJCTKgvlmg2Da7iRAz_lDGl2rv0CcIQLJjfqaOVRrzzAz6Omww9uzjFuQoXDrQZN_pVLeAy0P1IwxU5FuewAGu2627xSao2_ZZWEyBmPsW2uXdsg__gDAa5LyLvhdPhZsmnhFb_cd8rsWANYHKa7ufgJG2CQ"
let accountId = process.env.ACCOUNT_ID || "5716b107-3559-4e14-9ff3-ce3ce61cb822"

const api = new MetaApi(token)

export async function testMetaApiSynchronization() {
  try {
    const account = await api.metatraderAccountApi.getAccount(accountId)
    const initialState = account.state
    const deployedStates = ["DEPLOYING", "DEPLOYED"]

    if (!deployedStates.includes(initialState)) {
      // wait until account is deployed and connected to broker
      console.info("Deploying account")
      await account.deploy()
    }

    console.info(
      "Waiting for API server to connect to broker (may take couple of minutes)",
    )
    await account.waitConnected()

    // connect to MetaApi API
    let connection = account.getRPCConnection()
    await connection.connect()

    // wait until terminal state synchronized to the local state
    console.info(
      "Waiting for SDK to synchronize to terminal state (may take some time depending on your history size)",
    )
    await connection.waitSynchronized()

    // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
    console.info("Testing MetaAPI RPC API")
    console.info(
      "account information:",
      await connection.getAccountInformation(),
    )
    console.info("positions:", await connection.getPositions())
    //console.log(await connection.getPosition('1234567'));
    console.info("open orders:", await connection.getOrders())
    //console.log(await connection.getOrder('1234567'));
    console.info(
      "history orders by ticket:",
      await connection.getHistoryOrdersByTicket("1234567"),
    )
    console.info(
      "history orders by position:",
      await connection.getHistoryOrdersByPosition("1234567"),
    )
    console.info(
      "history orders (~last 3 months):",
      await connection.getHistoryOrdersByTimeRange(
        new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        new Date(),
      ),
    )
    console.info(
      "history deals by ticket:",
      await connection.getDealsByTicket("1234567"),
    )
    console.info(
      "history deals by position:",
      await connection.getDealsByPosition("1234567"),
    )
    console.info(
      "history deals (~last 3 months):",
      await connection.getDealsByTimeRange(
        new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        new Date(),
      ),
    )
    console.info("server time", await connection.getServerTime())

    // calculate margin required for trade
    console.info(
      "margin required for trade",
      await connection.calculateMargin({
        symbol: "GBPUSD",
        type: "ORDER_TYPE_BUY",
        volume: 0.1,
        openPrice: 1.1,
      }),
    )

    // trade
    console.info("Submitting pending order")
    try {
      let result = await connection.createLimitBuyOrder(
        "GBPUSD",
        0.07,
        1.0,
        0.9,
        2.0,
        {
          comment: "comm",
          clientId: "TE_GBPUSD_7hyINWqAlE",
          expiration: {
            type: "ORDER_TIME_SPECIFIED",
            time: new Date(Date.now() + 24 * 60 * 60 * 1000),
          },
        },
      )
      console.info("Trade successful, result code is " + result.stringCode)
    } catch (err: any) {
      console.info("Trade failed with result code " + err.stringCode)
    }

    if (!deployedStates.includes(initialState)) {
      // undeploy account if it was undeployed
      console.info("Undeploying account")
      await connection.close()
      await account.undeploy()
    }
  } catch (err) {
    console.error(err)
  }
  process.exit()
}
