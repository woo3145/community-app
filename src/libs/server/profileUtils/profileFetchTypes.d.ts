import { fetchProfileByUserId } from './profileFetch';

export type Profile = Awaited<ReturnType<typeof fetchProfileByUserId>>;
