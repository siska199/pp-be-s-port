import prisma from "@_db/prisma";
import {
  filterKeysObject,
  removeKeyWithUndifienedValue,
  trimObject,
} from "@_lib/helpers/function";
import { KeyMetric } from "@prisma/client";

export const getListKeyMetricService = async (params: { id_user: string }) => {
  const { id_user } = params;
  const result = await prisma.keyMetric.findMany({
    where: {
      id_user,
    },
  });

  const resultDto = await Promise.all(
    result?.map(async (data:KeyMetric) => {
      return {
        ...data
      };
    })
  );
  return result ? resultDto : null;
};

export const upsertKeyMetricService = async (params: KeyMetric) => {
  const id = params.id ?? "";

  const dataDto = trimObject({
    key : params?.key,
    value: params?.value
  });

  const result = id
    ? await prisma?.keyMetric?.update({
        where: {
          id,
        },
        data: filterKeysObject({
          object: removeKeyWithUndifienedValue(dataDto),
          keys: ["id_user"],
        }),
      })
    : await prisma?.keyMetric?.create({
        data: dataDto as KeyMetric,
      });

  const resultDto = filterKeysObject({
    object: result,
    keys: ["created_at", "updated_at"],
  });

  return result ? resultDto : null;
};

export const upsertBulkKeyMetricService = async (
  params: (Omit<KeyMetric, "created_at" | "updated_at" | "id"> & {
    id?: string;
  })[]
) => {
  const listData = params?.map((data) =>
    removeKeyWithUndifienedValue({
      key: data?.key,
      value: data?.value,
      id_user: data?.id_user,
      id: data?.id || undefined,
    })
  );

  const isUpdate = listData?.every((data) => data.id);

  const result = isUpdate
    ? await Promise.all(
        listData?.map(async (data) => {
          await prisma?.keyMetric?.update({
            where: {
              id: data?.id,
            },
            data: data,
          });
        })
      )
    : await prisma?.keyMetric?.createMany({
        data: listData as KeyMetric[],
      });

  const resultDto = result;

  return resultDto;
};

export const deleteKeyMetricByIdService = async (param: string) => {
  const id = param;

  const result = await prisma?.keyMetric?.delete({
    where: {
      id,
    },
  });

  return result;
};
