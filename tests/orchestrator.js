import retry from "async-retry";

async function awaitForAllServices() {
  await waitForWevServer();

  async function waitForWevServer() {
    return retry(featchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function featchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

export default {
  awaitForAllServices,
};
