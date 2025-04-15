import {
	aws_cloudfront,
	aws_cloudfront_origins,
	aws_s3,
	aws_s3_deployment,
	CfnOutput,
	RemovalPolicy,
	aws_iam,
	Stack,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';

const pathToDist = path.resolve(__dirname, '../../frontend/dist');

export class DeploymentService extends Construct {
	constructor(scope: Construct, id: string) {
		super(scope, id);

		const hostingBucket = new aws_s3.Bucket(this, 'FrontendBucket', {
			blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		const distribution = new aws_cloudfront.Distribution(
			this,
			'CloudfrontDistribution',
			{
				defaultBehavior: {
					origin:
						aws_cloudfront_origins.S3BucketOrigin.withOriginAccessControl(
							hostingBucket
						),
					viewerProtocolPolicy:
						aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				},
				defaultRootObject: 'index.html',
				errorResponses: [
					{
						httpStatus: 404,
						responseHttpStatus: 200,
						responsePagePath: '/index.html',
					},
				],
			}
		);

		new aws_s3_deployment.BucketDeployment(this, 'BucketDeployment', {
			sources: [aws_s3_deployment.Source.asset(pathToDist)],
			destinationBucket: hostingBucket,
			distribution,
			distributionPaths: ['/*'],
		});

		new CfnOutput(this, 'CloudFrontURL', {
			value: distribution.domainName,
			description: 'The distribution URL',
			exportName: 'CloudfrontURL',
		});

		new CfnOutput(this, 'BucketName', {
			value: hostingBucket.bucketName,
			description: 'The name of the S3 bucket',
			exportName: 'BucketName',
		});

		hostingBucket.addToResourcePolicy(
			new aws_iam.PolicyStatement({
				actions: ['s3:GetObject'],
				resources: [`${hostingBucket.bucketArn}/*`],
				principals: [new aws_iam.ServicePrincipal('cloudfront.amazonaws.com')],
				conditions: {
					StringEquals: {
						'AWS:SourceArn': `arn:aws:cloudfront::${
							Stack.of(this).account
						}:distribution/${distribution.distributionId}`,
					},
				},
			})
		);
	}
}
