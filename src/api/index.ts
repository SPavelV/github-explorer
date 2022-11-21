import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: process.env.REACT_APP_PERSONAL_ACCESS_TOKEN as string,
});

export const API = {
  getSearchRepos: async (search?: string) => {
    try {
      if (search) {
        const response = await octokit.request({
          method: "GET",
          url: `/search/repositories`,
          q: encodeURIComponent(`${search}`),
        });
        if (response.status !== 200) throw new Error("Error fetching");
        return response.data.items;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("error :>> ", error.message);
        throw error;
      }
    }
  },
  getDetail: async (name: string) => {
    try {
      const [{ data: langs }, { data: readme }] = await Promise.all([
        octokit.request({
          method: "GET",
          url: `/repos/${name}/languages`,
        }),

        octokit.request({
          method: "GET",
          url: `/repos/${name}/readme`,
        }),
      ]);

      return { langs, readme: readme };
    } catch (error) {
      if (error instanceof Error) {
        console.error("error :>> ", error.message);
        throw error;
      }
    }
  },
};
